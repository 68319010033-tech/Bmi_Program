// ฟังก์ชันคำนวณค่า BMI
// สูตร: น้ำหนัก (กก.) / (ส่วนสูง (เมตร) ^ 2)
function calculateBMI(weightKg, heightCm) {

  const weight = parseFloat(weightKg);
  const height = parseFloat(heightCm);

  if (isNaN(weight) || isNaN(height)) {
    return -2; // ส่งกลับค่า -2 เพื่อบอกว่า "ข้อมูลที่กรอกไม่ใช่ตัวเลข"
  }
  
  if (weight <= 0 || height <= 0) return 0;

  if (weight > 500 || height > 250) {
    return -1; // ส่งกลับค่า -1 เพื่อบอกว่า "ข้อมูลเกินมาตรฐานจริง"
  }
  
  const heightMeters = height / 100; // แปลงเซนติเมตรเป็นเมตร
  const bmi = weight / (heightMeters * heightMeters);
  
  return parseFloat(bmi.toFixed(2)); // ปัดเศษทศนิยม 2 ตำแหน่ง
}

// ฟังก์ชันแปลผลเกณฑ์ BMI (อ้างอิงตามเกณฑ์เอเชีย)
function getBMICategory(bmi) {
  if (bmi === -2) return 'กรุณากรอกข้อมูลเป็นตัวเลขเท่านั้น';
  if (bmi === -1) return 'ข้อมูลเกินมาตรฐานมนุษย์ปกติ';
  if (bmi <= 0) return 'ข้อมูลไม่ถูกต้อง';
  if (bmi < 18.5) return 'น้ำหนักน้อย / ผอม';
  if (bmi < 23.0) return 'ปกติ (สุขภาพดี)';
  if (bmi < 25.0) return 'ท้วม / โรคอ้วนระดับ 1';
  if (bmi < 30.0) return 'อ้วน / โรคอ้วนระดับ 2';
  return 'อ้วนมาก / โรคอ้วนระดับ 3';
}

// ฟังก์ชันประเมินความเสี่ยงต่อโรค
function getHealthRisk(bmi) {
  if (bmi === -2) return 'ไม่สามารถประเมินได้เนื่องจากข้อมูลไม่ใช่ตัวเลข';
  if (bmi < 0 && bmi !== -1) return 'ข้อมูลไม่ถูกต้อง'; // ⭐ ปรับตรงนี้: ถ้าติดลบและไม่ใช่ -1 ให้บอกไม่ถูกต้อง
  if (bmi === -1) return 'ไม่สามารถประเมินได้เนื่องจากข้อมูลเกินมาตรฐาน';
  if (bmi < 18.5) return 'มากกว่าคนปกติ (เสี่ยงขาดสารอาหาร)';
  if (bmi < 23.0) return 'เท่าคนปกติ';
  if (bmi < 25.0) return 'อันตรายระดับ 1';
  if (bmi < 30.0) return 'อันตรายระดับ 2';
  return 'อันตรายระดับ 3';
}

module.exports = { calculateBMI, getBMICategory, getHealthRisk };