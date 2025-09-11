import RequestImg from '../../../assets/landing/prescription.png';
import DoctorApprovalImg from '../../../assets/landing/doctor-approval.png';
import LogisticsAdminImg from '../../../assets/landing/logistic.png';
import MedicineDeliveredImg from '../../../assets/landing/order-delivery.png';

export const steps = [
  {
    title: 'Request',
    description: 'User sends a medicine request through the platform with a valid prescription and essential details.',
    actionText: 'Submit your request',
    imgUrl: RequestImg,
    imgAlt: 'Medicine request illustration',
  },
  {
    title: 'Doctor Verification',
    description: 'A certified doctor reviews and verifies the prescription for authenticity and medical need.',
    actionText: 'Doctor reviews and approves',
    imgUrl: DoctorApprovalImg,
    imgAlt: 'Doctor approval illustration',
  },
  {
    title: 'Logistics',
    description: 'Our admin team manages procurement and logistics to ensure timely, safe medicine delivery.',
    actionText: 'Admin arranges delivery',
    imgUrl: LogisticsAdminImg,
    imgAlt: 'Logistics and admin illustration',
  },
  {
    title: 'Delivered',
    description: 'Medicines are delivered directly to the requester’s doorstep in compliance with healthcare protocols.',
    actionText: 'Receive your medicines',
    imgUrl: MedicineDeliveredImg,
    imgAlt: 'Medicine delivery illustration',
  },
];
