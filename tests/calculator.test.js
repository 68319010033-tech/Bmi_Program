// import ฟังก์ชันคำนวณมวลกายที่ต้องการทดสอบ
const { calculateBMI, getBMICategory, getHealthRisk } = require('../src/utils/calculator.js');

// ==========================================
// 1. ทดสอบฟังก์ชันคำนวณค่า BMI (calculateBMI)
// ==========================================
test('calculateBMI: น้ำหนัก 70 กก. ส่วนสูง 175 ซม. ต้องได้ BMI 22.86', () => {
  expect(calculateBMI(70, 175)).toBe(22.86);
});

test('calculateBMI: ใส่ค่าน้อยกว่าหรือเท่ากับ 0 ต้องได้ 0', () => {
  expect(calculateBMI(0, 170)).toBe(0);
  expect(calculateBMI(60, -5)).toBe(0);
});

// ==========================================
// 2. ทดสอบฟังก์ชันเกณฑ์ BMI (getBMICategory)
// ==========================================
test('getBMICategory: BMI 17.5 ต้องได้ ผอม', () => {
  expect(getBMICategory(17.5)).toBe('น้ำหนักน้อย / ผอม');
});

test('getBMICategory: BMI 22.0 ต้องได้ ปกติ', () => {
  expect(getBMICategory(22.0)).toBe('ปกติ (สุขภาพดี)');
});

test('getBMICategory: BMI 24.5 ต้องได้ ท้วม', () => {
  expect(getBMICategory(24.5)).toBe('ท้วม / โรคอ้วนระดับ 1');
});

test('getBMICategory: BMI 28.0 ต้องได้ อ้วน', () => {
  expect(getBMICategory(28.0)).toBe('อ้วน / โรคอ้วนระดับ 2');
});

test('getBMICategory: BMI 32.0 ต้องได้ อ้วนมาก', () => {
  expect(getBMICategory(32.0)).toBe('อ้วนมาก / โรคอ้วนระดับ 3');
});

// ==========================================
// 3. ทดสอบฟังก์ชันความเสี่ยงต่อโรค (getHealthRisk)
// ==========================================
test('getHealthRisk: BMI 22.0 ความเสี่ยงต้องเท่าคนปกติ', () => {
  expect(getHealthRisk(22.0)).toBe('เท่าคนปกติ');
});

test('getHealthRisk: BMI 29.0 ความเสี่ยงต้องอันตรายระดับ 2', () => {
  expect(getHealthRisk(29.0)).toBe('อันตรายระดับ 2');
});

test('getHealthRisk: ค่า BMI ติดลบ ต้องได้ ข้อมูลไม่ถูกต้อง', () => {
  expect(getHealthRisk(-5)).toBe('ข้อมูลไม่ถูกต้อง');
});

// ==========================================
// ทดสอบการดักจับข้อมูล Input ที่มากเกินปกติ
// ==========================================

test('calculateBMI: ใส่ส่วนสูงเกินจริง (300 ซม.) ต้องได้ -1', () => {
  expect(calculateBMI(70, 300)).toBe(-1);
});

test('calculateBMI: ใส่น้ำหนักเกินจริง (600 กก.) ต้องได้ -1', () => {
  expect(calculateBMI(600,175)).toBe(-1);
});

test('getBMICategory: เมื่อค่า BMI เป็น -1 ต้องแจ้งเตือนข้อมูลเกินมาตรฐาน', () => {
  expect(getBMICategory(-1)).toBe('ข้อมูลเกินมาตรฐานมนุษย์ปกติ');
});

// ========================================================
// ⭐ [จุดที่เพิ่ม] เพิ่มกลุ่มการทดสอบสำหรับข้อมูลที่เป็นตัวหนังสือ (String)
// ========================================================

test('calculateBMI: กรอกน้ำหนักเป็นข้อความ/ตัวหนังสือ ต้องได้ -2', () => {
  expect(calculateBMI('แปดสิบ', 170)).toBe(-2);
});

test('calculateBMI: กรอกส่วนสูงเป็นตัวอักษรภาษาอังกฤษ ต้องได้ -2', () => {
  expect(calculateBMI(65, 'abc')).toBe(-2);
});

test('calculateBMI: ถ้าส่งตัวเลขในรูปแบบ String (เช่นจาก Form) ต้องยังคำนวณได้ปกติ', () => {
  // รับค่ามาจาก Input หน้าเว็บ มักจะเป็น String "70" และ "175"
  expect(calculateBMI('70', '175')).toBe(22.86); 
});

test('getBMICategory: เมื่อค่า BMI เป็น -2 ต้องแจ้งเตือนให้กรอกตัวเลข', () => {
  expect(getBMICategory(-2)).toBe('กรุณากรอกข้อมูลเป็นตัวเลขเท่านั้น');
});

test('getHealthRisk: เมื่อค่า BMI เป็น -2 ต้องแจ้งเตือนว่าไม่สามารถประเมินได้', () => {
  expect(getHealthRisk(-2)).toBe('ไม่สามารถประเมินได้เนื่องจากข้อมูลไม่ใช่ตัวเลข');
});