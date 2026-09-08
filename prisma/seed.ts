import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { ACADEMY_MODULES } from '../src/lib/coursesData';
import { mockGlossaryTerms } from '../src/lib/mockData';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with upgraded comprehensive curriculum...');

  // Admin user
  const adminPassword = await hash(process.env.ADMIN_PASSWORD || 'admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@ziabl.ru' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@ziabl.ru',
      name: 'Admin',
      passwordHash: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Course
  const course = await prisma.course.upsert({
    where: { slug: 'trading-2-0' },
    update: {},
    create: {
      slug: 'trading-2-0',
      titleRu: 'Ziabl Trade Academy: Академический курс 2.0',
      titleEn: 'Ziabl Trade Academy: Comprehensive Course 2.0',
      descRu: 'Фундаментальная программа: от философии денег Франклина и Кийосаки до стандартов Московской Биржи, стоимостного анализа Баффетта и кейса Майкла Бьюрри',
      descEn: 'Comprehensive investment program: from Franklin and Kiyosaki philosophy to MOEX standards, Buffett value investing, and Michael Burry case study',
      order: 1,
    },
  });

  // Create or update modules and lessons from ACADEMY_MODULES
  for (const modData of ACADEMY_MODULES) {
    const { lessons: lessonsData, id: _ignoreModId, ...moduleFields } = modData;

    const mod = await prisma.module.upsert({
      where: { slug: modData.slug },
      update: {
        titleRu: moduleFields.titleRu,
        titleEn: moduleFields.titleEn,
        descRu: moduleFields.descRu,
        descEn: moduleFields.descEn,
        icon: moduleFields.icon,
        order: moduleFields.order,
      },
      create: {
        ...moduleFields,
        courseId: course.id,
      },
    });
    console.log(`  📦 Module [${mod.order}]: ${mod.titleRu}`);

    for (const lessonData of lessonsData) {
      const { quiz: quizData, id: _ignoreLessonId, ...lessonFields } = lessonData;

      const lesson = await prisma.lesson.upsert({
        where: { slug: lessonData.slug },
        update: {
          titleRu: lessonFields.titleRu,
          titleEn: lessonFields.titleEn,
          contentRu: lessonFields.contentRu,
          contentEn: lessonFields.contentEn,
          order: lessonFields.order,
          hasChart: !!lessonFields.hasChart,
          chartType: lessonFields.chartType || null,
        },
        create: {
          ...lessonFields,
          moduleId: mod.id,
        },
      });
      console.log(`    📝 Lesson [${lesson.order}]: ${lesson.titleRu}`);

      if (quizData && quizData.questions && quizData.questions.length > 0) {
        const quiz = await prisma.quiz.upsert({
          where: { lessonId: lesson.id },
          update: { passingScore: quizData.passingScore || 70 },
          create: { lessonId: lesson.id, passingScore: quizData.passingScore || 70 },
        });

        // Delete existing questions to avoid duplication on re-seed
        await prisma.quizQuestion.deleteMany({
          where: { quizId: quiz.id },
        });

        for (let qi = 0; qi < quizData.questions.length; qi++) {
          const q = quizData.questions[qi];
          await prisma.quizQuestion.create({
            data: {
              quizId: quiz.id,
              order: qi + 1,
              questionRu: q.questionRu,
              questionEn: q.questionEn,
              optionsRu: q.optionsRu,
              optionsEn: q.optionsEn,
              correctIndices: q.correctIndices,
              explanationRu: q.explanationRu,
              explanationEn: q.explanationEn,
            },
          });
        }
        console.log(`    ✅ Quiz: ${quizData.questions.length} questions registered`);
      }
    }
  }

  // Glossary terms
  for (const term of mockGlossaryTerms) {
    await prisma.glossaryTerm.upsert({
      where: { termRu: term.termRu },
      update: {
        termEn: term.termEn,
        definitionRu: term.definitionRu,
        definitionEn: term.definitionEn,
        category: term.category,
        relatedLessonSlug: term.relatedLessonSlug,
      },
      create: {
        termRu: term.termRu,
        termEn: term.termEn,
        definitionRu: term.definitionRu,
        definitionEn: term.definitionEn,
        category: term.category,
        relatedLessonSlug: term.relatedLessonSlug,
      },
    });
  }
  console.log(`✅ Glossary: ${mockGlossaryTerms.length} terms created/updated`);

  console.log('\n🎉 Comprehensive curriculum seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
