<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🏥 CareFlow – Smart Patient Workflow Coordinator

CareFlow is a role-based hospital workflow dashboard that coordinates the complete patient journey across departments such as Doctor, Nurse, Lab, Pharmacy, and Admin.

Instead of fragmented systems, CareFlow provides a unified patient record and shared workflow timeline where each role performs tasks and updates patient progress in real time.

This project was built as a hackathon MVP using AI-assisted development tools and focuses on frontend prototype functionality with role-based workflow simulation.

---

## 📌 Core Idea

Hospital departments often work in isolation, causing delays and communication gaps. CareFlow solves this by connecting all roles to a single patient workflow system. Each department has its own panel but works on the same patient record and timeline.

Actions performed by one role become visible to others instantly within the workflow.

---

## 👥 Role-Based Panels & Workflow

### 👨‍⚕️ Doctor Panel

Doctor can:

- View patient details and history
- Add diagnosis
- Prescribe medicines
- Order lab tests
- Activate lab workflow
- Update treatment stages
- View uploaded lab reports
- Mark steps as completed

**Workflow:**  
Doctor selects patient → adds diagnosis & prescriptions → orders lab test → presses **Activate** → lab receives request → later reviews report → updates treatment → marks stage complete.

---

### 🧑‍⚕️ Nurse Panel

Nurse can:

- View assigned patients
- Record vitals
- Add nursing notes
- Update patient status
- Mark vitals check as completed

**Workflow:**  
Nurse opens patient → records vitals → submits → update appears in shared patient timeline visible to doctor and admin.

---

### 🧪 Lab Panel

Lab technician can:

- View doctor test requests
- See pending lab tasks
- Upload lab reports
- Mark test as completed

**Workflow:**  
Doctor orders test → appears in Lab panel → technician uploads report → marks complete → report becomes visible in Doctor panel.

---

### 💊 Pharmacy Panel

Pharmacy can:

- View prescriptions
- See pending medicine requests
- Mark medicines as dispensed
- Update medication status

**Workflow:**  
Doctor prescribes → appears in Pharmacy queue → pharmacist dispenses → status updates in patient record.

---

### 🧾 Admin Panel

Admin can:

- View all patients
- Track workflow progress
- Monitor department task status
- Manage billing records
- Update bill details
- View patient bills
- Edit payment status

**Billing module includes:**

- Patient name
- Services/tests
- Total amount
- Paid amount
- Due amount
- Payment status (Paid / Pending / Partial)

Billing is implemented using frontend mock data for MVP demo.

---

## 🔄 Patient Workflow Flow

1. Patient registered
2. Doctor diagnoses and prescribes
3. Doctor activates lab test
4. Lab uploads report
5. Doctor reviews report
6. Nurse records vitals
7. Pharmacy dispenses medicines
8. Admin updates billing
9. Workflow marked complete

All steps update a shared timeline.

---

## 🧰 Tech Stack

### Languages
- JavaScript
- TypeScript
- HTML
- CSS

### Frontend
- React

### Styling
- Tailwind CSS

### Build Tool
- Vite

### AI Development Tools
- Google AI Studio – Initial prototype generation
- Cursor IDE – AI-assisted development

---

## ⚠️ Important Notes

- Hackathon MVP prototype
- Frontend-only implementation
- No backend or database integration
- Uses mock/local state data
- Designed for workflow visualization and demo

---

## 🖼 MVP Screenshots & Walkthrough

### 🔐 Sign In Page

![Sign In Page](https://github.com/user-attachments/assets/b7705cd1-f226-434e-840d-f673279dc018)  
*Users select their role and sign in to access their panel.*

![Sign In Role Selection](https://github.com/user-attachments/assets/323a16a8-0116-4142-a0fd-327cdbbea72b)  
*Role-based access ensures each department sees only relevant tools.*

---

### 👨‍⚕️ Doctor Panel

![Doctor Dashboard](https://github.com/user-attachments/assets/7b5c9a36-4d96-4496-9279-0da4715bc56a)  
*Doctor views patient list and selects a record.*

![Doctor Actions](https://github.com/user-attachments/assets/c5803d5b-974a-4bf6-b78f-859f79ead541)  
*Doctor adds diagnosis and orders lab tests.*

![Doctor Lab Review](https://github.com/user-attachments/assets/524b955b-2286-4f0a-b1b5-a0f7f2b710d4)  
*Doctor reviews uploaded reports.*

---

### 🧪 Lab Panel

![Lab Requests](https://github.com/user-attachments/assets/dd1ace3b-22ff-4712-82a6-fd35f128c874)  
*Pending test requests appear here.*

![Lab Upload](https://github.com/user-attachments/assets/967ab23e-2288-4a1c-8da1-86be559be50b)  
*Technician uploads report files.*

![Lab Complete](https://github.com/user-attachments/assets/faf7a7c0-8711-4571-a973-e37e02bdb485)  
*Report marked complete and visible to doctor.*

---

### 🧑‍⚕️ Nurse Panel

![Nurse Dashboard](https://github.com/user-attachments/assets/8fc2b547-5448-4dd7-926e-42155ad42359)  
*Nurse sees assigned patients.*

![Nurse Vitals](https://github.com/user-attachments/assets/db02a73d-190a-4fe5-b9dc-71d863286bc5)  
*Vitals recorded and notes added.*

![Nurse Update](https://github.com/user-attachments/assets/6cb5dd1c-7729-4aa3-9583-63f713c7ebb2)  
*Vitals update appears in patient timeline.*

---

### 🧾 Admin Panel

![Admin Dashboard](https://github.com/user-attachments/assets/9bcdbdf1-90ec-4db2-ae1e-20011b98e6bc)  
*Admin monitors workflow progress.*

![Admin Billing](https://github.com/user-attachments/assets/e9a70554-2bd8-4141-83a5-1914bed6d149)  
*Billing details updated.*

![Admin Bill View](https://github.com/user-attachments/assets/2944effb-b2cf-407a-8d26-f0f6712b4841)  
*Bill totals and payment status shown.*

---

## 🧪 Built For

College Vibe Coding Hackathon – AI-assisted rapid prototyping

---

## 👥 Team

S. Sai Likhith  
T. Sai Pratheek  
E. Akash Krishna
