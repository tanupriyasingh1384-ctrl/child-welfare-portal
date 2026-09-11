import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clean existing records to prevent duplicates on multiple runs
  await prisma.incidentReport.deleteMany({});
  await prisma.nutritionLog.deleteMany({});
  await prisma.attendanceRecord.deleteMany({});
  await prisma.child.deleteMany({});

  // 1. Child 1: Anita Kumari (Severe Acute Malnutrition) - Ranchi
  const child1 = await prisma.child.create({
    data: {
      fullName: 'Anita Kumari',
      ageYears: 4,
      gender: 'FEMALE',
      guardianName: 'Suresh Munda',
      guardianPhone: '9431102938',
      villageOrCity: 'Kanke Village',
      district: 'Ranchi',
      state: 'Jharkhand',
      schoolOrCenterId: 'ANG-RNC-01',
      nutritionRecords: {
        create: [
          {
            ageMonths: 48,
            weightKg: 9.8,
            heightCm: 95.0,
            status: 'SEVERE_ACUTE_MALNUTRITION',
          },
        ],
      },
      attendanceLogs: {
        create: [
          {
            schoolId: 'ANG-RNC-01',
            consecutiveAbsences: 1,
            riskFlagged: false,
            lastAttendDate: new Date('2026-09-05'),
          },
        ],
      },
    },
  });

  // 2. Child 2: Rahul Kumar (Dropout Risk: 6 consecutive absences & Child Labour Incident) - Dhanbad
  const child2 = await prisma.child.create({
    data: {
      fullName: 'Rahul Kumar',
      ageYears: 10,
      gender: 'MALE',
      guardianName: 'Ramesh Mahato',
      guardianPhone: '9835129401',
      villageOrCity: 'Jharia Coalfield Belt',
      district: 'Dhanbad',
      state: 'Jharkhand',
      schoolOrCenterId: 'SCH-DHN-04',
      attendanceLogs: {
        create: [
          {
            schoolId: 'SCH-DHN-04',
            consecutiveAbsences: 6,
            riskFlagged: true,
            lastAttendDate: new Date('2026-08-28'),
          },
        ],
      },
      nutritionRecords: {
        create: [
          {
            ageMonths: 120,
            weightKg: 24.5,
            heightCm: 130.0,
            status: 'MODERATE',
          },
        ],
      },
      incidents: {
        create: [
          {
            reporterName: 'Sunil Verma (Childline Worker)',
            reporterPhone: '9123894012',
            incidentType: 'CHILD_LABOUR',
            locationDesc: 'Local Brick Kiln near Jharia Bypass',
            district: 'Dhanbad',
            riskLevel: 'CRITICAL',
            status: 'IN_REVIEW',
            description: 'Child engaged in hazardous manual labor at local brick kiln during school hours.',
          },
        ],
      },
    },
  });

  // 3. Child 3: Sunita Oraon (Trafficking Risk Incident) - Gumla
  const child3 = await prisma.child.create({
    data: {
      fullName: 'Sunita Oraon',
      ageYears: 12,
      gender: 'FEMALE',
      guardianName: 'Budhwa Oraon',
      guardianPhone: '9934105829',
      villageOrCity: 'Bishunpur Block',
      district: 'Gumla',
      state: 'Jharkhand',
      schoolOrCenterId: 'SCH-GML-02',
      nutritionRecords: {
        create: [
          {
            ageMonths: 144,
            weightKg: 34.0,
            heightCm: 142.0,
            status: 'NORMAL',
          },
        ],
      },
      attendanceLogs: {
        create: [
          {
            schoolId: 'SCH-GML-02',
            consecutiveAbsences: 4,
            riskFlagged: true,
            lastAttendDate: new Date('2026-09-01'),
          },
        ],
      },
      incidents: {
        create: [
          {
            reporterName: 'Anjali Tirkey (Panchayat Sevak)',
            reporterPhone: '9771234901',
            incidentType: 'TRAFFICKING_RISK',
            locationDesc: 'Gumla Bus Stand Road',
            district: 'Gumla',
            riskLevel: 'HIGH',
            status: 'OPEN',
            description: 'Unidentified placement agent attempted to lure minor girl with promises of placement in metropolitan city.',
          },
        ],
      },
    },
  });

  // 4. Child 4: Vikram Hansda (Normal Nutrition & Good Attendance) - Hazaribagh
  const child4 = await prisma.child.create({
    data: {
      fullName: 'Vikram Hansda',
      ageYears: 7,
      gender: 'MALE',
      guardianName: 'Shambhu Hansda',
      guardianPhone: '9470123847',
      villageOrCity: 'Ichak Block',
      district: 'Hazaribagh',
      state: 'Jharkhand',
      schoolOrCenterId: 'SCH-HZB-12',
      nutritionRecords: {
        create: [
          {
            ageMonths: 84,
            weightKg: 22.0,
            heightCm: 120.0,
            status: 'NORMAL',
          },
        ],
      },
      attendanceLogs: {
        create: [
          {
            schoolId: 'SCH-HZB-12',
            consecutiveAbsences: 0,
            riskFlagged: false,
            lastAttendDate: new Date('2026-09-08'),
          },
        ],
      },
    },
  });

  // 5. Child 5: Priyanka Bauri (Normal Nutrition & Anganwadi Tracking) - Ranchi
  const child5 = await prisma.child.create({
    data: {
      fullName: 'Priyanka Bauri',
      ageYears: 3,
      gender: 'FEMALE',
      guardianName: 'Karan Bauri',
      guardianPhone: '9102938475',
      villageOrCity: 'Namkum',
      district: 'Ranchi',
      state: 'Jharkhand',
      schoolOrCenterId: 'ANG-RNC-05',
      nutritionRecords: {
        create: [
          {
            ageMonths: 36,
            weightKg: 13.5,
            heightCm: 94.0,
            status: 'NORMAL',
          },
        ],
      },
      attendanceLogs: {
        create: [
          {
            schoolId: 'ANG-RNC-05',
            consecutiveAbsences: 0,
            riskFlagged: false,
            lastAttendDate: new Date('2026-09-07'),
          },
        ],
      },
    },
  });

  console.log('✅ Seeding completed successfully!');
  console.log('Seeded Children:', [
    child1.fullName,
    child2.fullName,
    child3.fullName,
    child4.fullName,
    child5.fullName,
  ]);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
