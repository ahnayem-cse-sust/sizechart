// Seeds the database with a starter library of size chart templates and
// charts so the app isn't an empty shell on first install. Safe to re-run:
// it only seeds when the Template table is empty.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CONTENT_TYPE_DESCRIPTION = "CT_DSC";
const CONTENT_TYPE_TABLE = "CT_TBL";

function table(headers, rows) {
  return JSON.stringify([headers, ...rows]);
}

function description(html) {
  return JSON.stringify(html);
}

// Each category holds 5 ready-made templates. Every template gets a short
// description block, a measurement table, and a matching chart with a
// realistic set of available sizes — 25 templates + 25 charts = 50 records.
const CATEGORIES = [
  {
    category: "Mens Fashion",
    items: [
      {
        title: "Men's T-Shirts",
        blurb: "<p>Measurements are taken with the garment laid flat.</p>",
        headers: ["Size", "Chest (in)", "Length (in)"],
        rows: [
          ["XS", "34-36", "26"],
          ["S", "36-38", "27"],
          ["M", "38-40", "28"],
          ["L", "40-42", "29"],
          ["XL", "42-44", "30"],
          ["XXL", "44-46", "31"],
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      },
      {
        title: "Men's Dress Shirts",
        blurb: "<p>For the best fit, measure over a well-fitting shirt.</p>",
        headers: ["Size", "Neck (in)", "Chest (in)", "Sleeve (in)"],
        rows: [
          ["S", "14.5-15", "38-40", "32-33"],
          ["M", "15.5-16", "40-42", "33-34"],
          ["L", "16.5-17", "42-44", "34-35"],
          ["XL", "17.5-18", "44-46", "35-36"],
          ["XXL", "18.5-19", "46-48", "36-37"],
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
      {
        title: "Men's Jeans",
        blurb: "<p>Waist size is measured around the natural waistline.</p>",
        headers: ["Waist (in)", "Hip (in)", "Inseam (in)"],
        rows: [
          ["28", "36", "30"],
          ["30", "38", "30"],
          ["32", "40", "32"],
          ["34", "42", "32"],
          ["36", "44", "34"],
          ["38", "46", "34"],
        ],
        sizes: ["28", "30", "32", "34", "36", "38"],
      },
      {
        title: "Men's Jackets",
        blurb: "<p>Layer over a mid-weight sweater for the best fit reference.</p>",
        headers: ["Size", "Chest (in)", "Shoulder (in)"],
        rows: [
          ["S", "36-38", "17.5"],
          ["M", "38-40", "18"],
          ["L", "40-42", "18.5"],
          ["XL", "42-44", "19"],
          ["XXL", "44-46", "19.5"],
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
      {
        title: "Men's Shorts",
        blurb: "<p>Length is measured from waistband to hem.</p>",
        headers: ["Size", "Waist (in)", "Length (in)"],
        rows: [
          ["S", "30-32", "19"],
          ["M", "32-34", "20"],
          ["L", "34-36", "21"],
          ["XL", "36-38", "22"],
        ],
        sizes: ["S", "M", "L", "XL"],
      },
    ],
  },
  {
    category: "Womens Fashion",
    items: [
      {
        title: "Women's Tops",
        blurb: "<p>Bust is measured at the fullest point.</p>",
        headers: ["Size", "Bust (in)", "Waist (in)"],
        rows: [
          ["XS", "31-32", "24-25"],
          ["S", "33-34", "26-27"],
          ["M", "35-36", "28-29"],
          ["L", "37-39", "30-32"],
          ["XL", "40-42", "33-35"],
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
      },
      {
        title: "Women's Dresses",
        blurb: "<p>Sizes shown are US numeric dress sizes.</p>",
        headers: ["Size", "Bust (in)", "Waist (in)", "Hip (in)"],
        rows: [
          ["2", "32", "24", "35"],
          ["4", "33", "25", "36"],
          ["6", "34", "26", "37"],
          ["8", "35.5", "27.5", "38.5"],
          ["10", "37", "29", "40"],
          ["12", "38.5", "30.5", "41.5"],
        ],
        sizes: ["2", "4", "6", "8", "10", "12"],
      },
      {
        title: "Women's Jeans",
        blurb: "<p>Hip is measured at the fullest point, about 8in below the waist.</p>",
        headers: ["Waist (in)", "Hip (in)", "Inseam (in)"],
        rows: [
          ["24", "34", "30"],
          ["26", "36", "30"],
          ["28", "38", "31"],
          ["30", "40", "31"],
          ["32", "42", "32"],
        ],
        sizes: ["24", "26", "28", "30", "32"],
      },
      {
        title: "Women's Jackets",
        blurb: "<p>Shoulder is measured seam to seam across the back.</p>",
        headers: ["Size", "Bust (in)", "Shoulder (in)"],
        rows: [
          ["XS", "31-32", "15"],
          ["S", "33-34", "15.5"],
          ["M", "35-36", "16"],
          ["L", "37-39", "16.5"],
          ["XL", "40-42", "17"],
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
      },
      {
        title: "Women's Skirts",
        blurb: "<p>Measure hip at the widest point below the waist.</p>",
        headers: ["Size", "Waist (in)", "Hip (in)"],
        rows: [
          ["XS", "24-25", "34-35"],
          ["S", "26-27", "36-37"],
          ["M", "28-29", "38-39"],
          ["L", "30-32", "40-42"],
          ["XL", "33-35", "43-45"],
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
      },
    ],
  },
  {
    category: "Kids Fashion",
    items: [
      {
        title: "Kids T-Shirts (2-8Y)",
        blurb: "<p>Choose a size based on your child's height for the best fit.</p>",
        headers: ["Age", "Height (cm)", "Chest (cm)"],
        rows: [
          ["2-3Y", "92-98", "53"],
          ["4-5Y", "104-110", "56"],
          ["6-7Y", "116-122", "60"],
          ["8Y", "128", "64"],
        ],
        sizes: ["2-3Y", "4-5Y", "6-7Y", "8Y"],
      },
      {
        title: "Kids Pants",
        blurb: "<p>Waist is measured unstretched, flat across the garment.</p>",
        headers: ["Age", "Waist (cm)", "Length (cm)"],
        rows: [
          ["2-3Y", "50", "40"],
          ["4-5Y", "52", "48"],
          ["6-7Y", "54", "56"],
          ["8Y", "56", "62"],
        ],
        sizes: ["2-3Y", "4-5Y", "6-7Y", "8Y"],
      },
      {
        title: "Kids Jackets",
        blurb: "<p>Leave room for a sweater underneath.</p>",
        headers: ["Age", "Chest (cm)", "Length (cm)"],
        rows: [
          ["2-3Y", "56", "38"],
          ["4-5Y", "60", "42"],
          ["6-7Y", "64", "46"],
          ["8Y", "68", "50"],
        ],
        sizes: ["2-3Y", "4-5Y", "6-7Y", "8Y"],
      },
      {
        title: "Baby Onesies (0-24M)",
        blurb: "<p>Sizes are based on age range; use weight if baby is between sizes.</p>",
        headers: ["Age", "Weight (kg)", "Height (cm)"],
        rows: [
          ["0-3M", "3.5-6", "50-60"],
          ["3-6M", "6-8", "60-67"],
          ["6-12M", "8-10", "67-75"],
          ["12-18M", "10-12", "75-83"],
          ["18-24M", "12-13.5", "83-91"],
        ],
        sizes: ["0-3M", "3-6M", "6-12M", "12-18M", "18-24M"],
      },
      {
        title: "Kids Dresses",
        blurb: "<p>Measure height without shoes for the most accurate size.</p>",
        headers: ["Age", "Height (cm)", "Chest (cm)"],
        rows: [
          ["2-3Y", "92-98", "53"],
          ["4-5Y", "104-110", "56"],
          ["6-7Y", "116-122", "60"],
          ["8Y", "128", "64"],
        ],
        sizes: ["2-3Y", "4-5Y", "6-7Y", "8Y"],
      },
    ],
  },
  {
    category: "Footwear",
    items: [
      {
        title: "Men's Shoes",
        blurb: "<p>Measure foot length in the evening, when feet are largest.</p>",
        headers: ["US", "UK", "EU", "Foot Length (cm)"],
        rows: [
          ["7", "6", "40", "25"],
          ["8", "7", "41", "25.7"],
          ["9", "8", "42", "26.7"],
          ["10", "9", "43", "27.3"],
          ["11", "10", "44", "28"],
          ["12", "11", "45", "28.9"],
        ],
        sizes: ["7", "8", "9", "10", "11", "12"],
      },
      {
        title: "Women's Shoes",
        blurb: "<p>If between sizes, we recommend sizing up.</p>",
        headers: ["US", "UK", "EU", "Foot Length (cm)"],
        rows: [
          ["5", "3", "35.5", "22"],
          ["6", "4", "36.5", "22.9"],
          ["7", "5", "37.5", "23.5"],
          ["8", "6", "38.5", "24.1"],
          ["9", "7", "40", "24.8"],
          ["10", "8", "41", "25.4"],
        ],
        sizes: ["5", "6", "7", "8", "9", "10"],
      },
      {
        title: "Kids Shoes",
        blurb: "<p>Measure your child's foot at the end of the day.</p>",
        headers: ["US", "EU", "Foot Length (cm)"],
        rows: [
          ["10", "27", "16.8"],
          ["11", "28", "17.5"],
          ["12", "30", "18.3"],
          ["13", "31", "19"],
          ["1", "32", "19.7"],
          ["2", "33", "20.3"],
        ],
        sizes: ["10", "11", "12", "13", "1", "2"],
      },
      {
        title: "Sandals",
        blurb: "<p>Sandal sizing runs slightly larger than closed-toe shoes.</p>",
        headers: ["Size", "Foot Length (cm)"],
        rows: [
          ["S", "22-23"],
          ["M", "24-25"],
          ["L", "26-27"],
          ["XL", "28-29"],
        ],
        sizes: ["S", "M", "L", "XL"],
      },
      {
        title: "Boots",
        blurb: "<p>Calf circumference matters most for tall boots.</p>",
        headers: ["US", "EU", "Calf Circumference (cm)"],
        rows: [
          ["6", "37", "34"],
          ["7", "38", "35"],
          ["8", "39", "36"],
          ["9", "40", "37"],
          ["10", "41", "38"],
          ["11", "42", "39"],
        ],
        sizes: ["6", "7", "8", "9", "10", "11"],
      },
    ],
  },
  {
    category: "Accessories",
    items: [
      {
        title: "Belts",
        blurb: "<p>Belt size is typically 2in larger than pant waist size.</p>",
        headers: ["Size", "Waist (in)"],
        rows: [
          ["S", "30-32"],
          ["M", "34-36"],
          ["L", "38-40"],
          ["XL", "42-44"],
        ],
        sizes: ["S", "M", "L", "XL"],
      },
      {
        title: "Gloves",
        blurb: "<p>Measure around the palm, excluding the thumb.</p>",
        headers: ["Size", "Hand Circumference (in)"],
        rows: [
          ["S", "6.5-7"],
          ["M", "7.5-8"],
          ["L", "8.5-9"],
          ["XL", "9.5-10"],
        ],
        sizes: ["S", "M", "L", "XL"],
      },
      {
        title: "Hats",
        blurb: "<p>Wrap a tape measure around the largest part of your head.</p>",
        headers: ["Size", "Head Circumference (cm)"],
        rows: [
          ["S", "54-55"],
          ["M", "56-57"],
          ["L", "58-59"],
          ["XL", "60-61"],
        ],
        sizes: ["S", "M", "L", "XL"],
      },
      {
        title: "Rings",
        blurb: "<p>For the most accurate fit, get sized at a jeweler.</p>",
        headers: ["US Size", "Diameter (mm)"],
        rows: [
          ["5", "15.7"],
          ["6", "16.5"],
          ["7", "17.3"],
          ["8", "18.1"],
          ["9", "19"],
          ["10", "19.8"],
        ],
        sizes: ["5", "6", "7", "8", "9", "10"],
      },
      {
        title: "Watch Bands",
        blurb: "<p>Measure your wrist just below the wrist bone.</p>",
        headers: ["Size", "Wrist Circumference (cm)"],
        rows: [
          ["S", "14-17"],
          ["M", "17-20"],
          ["L", "20-23"],
        ],
        sizes: ["S", "M", "L"],
      },
    ],
  },
];

async function main() {
  const existingCount = await prisma.template.count();
  if (existingCount > 0) {
    console.log(
      `Skipping seed: ${existingCount} template(s) already exist. Delete them first if you want to reseed.`,
    );
    return;
  }

  let templateCount = 0;
  let chartCount = 0;

  for (const group of CATEGORIES) {
    for (const item of group.items) {
      const template = await prisma.template.create({
        data: { title: item.title, category: group.category },
      });

      await prisma.templateContent.create({
        data: {
          serial_no: 1,
          template_id: template.id,
          content_type: CONTENT_TYPE_DESCRIPTION,
          content_obj: description(item.blurb),
        },
      });

      await prisma.templateContent.create({
        data: {
          serial_no: 2,
          template_id: template.id,
          content_type: CONTENT_TYPE_TABLE,
          content_obj: table(item.headers, item.rows),
        },
      });

      await prisma.chart.create({
        data: {
          title: item.title,
          template_id: template.id,
          available_sizes: JSON.stringify(item.sizes.map((value) => ({ value }))),
        },
      });

      templateCount += 1;
      chartCount += 1;
    }
  }

  console.log(`Seeded ${templateCount} templates and ${chartCount} charts.`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
