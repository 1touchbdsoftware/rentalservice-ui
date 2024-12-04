import { baseModel } from "../base-model";

export interface workShift extends baseModel{
    workShiftId: number,
    title: string,
    titleInBengali: string,
    name: string,
    nameDetail: string,
    nameInBengali: string,
    nameDetailInBengali: string,
    remarks: string,
    startTime: Date | null,
    endTime: Date | null,
    inBufferTime: number,
    maxInTime: Date | null,
    lunchStartTime: Date | null,
    lunchEndTime: Date | null,
    oTStartTime: Date | null,
    maxOTHour:number,
    maxBeforeTime: number,
    maxAfterTime: number,
    exceededMaxAfterTime: number,
    weekendDayName: string,
    weekends: string [],
    stateStatus:string,
    isApproved: boolean 
}

export interface employeeWorkShift extends baseModel{
    employeeWorkShiftId: number,
    fullName: string,
    employeeCode: string,
    employeeId: number,
    isActive: boolean,
    isApproved: boolean,
    stateStatus: string,
    activeDate: Date | null,
    inActiveDate: Date | null,
    gradeId: number,
    designationId: number,
    departmentId: number,
    sectionId: number,
    subsectionId: number,
    unitId: number,
    workShiftId: number,
    gradeName: string,
    designationName: string,
    departmentName: string,
    sectionName: string,
    unitName: string,
    subSectionName: string,
    workShiftName: string,
    remarks: string,
    currentWorkShiftId: number | null,
    currentWorkShiftName: string,
    error: boolean | null,
    isSelected: boolean
}

export interface schedulerInfo{
    schedulerInfoId: number,
    scheduleCode: string,
    hostEmployeeId: number,
    departmentId: number,
    subject: string,
    details: string,
    location: string,
    scheduleDate: Date | null,
    fromTime: Date | null,
    toTime: Date | null,
    stateStatus: string,
    lineManagerId: number | null,
    supervisorId: number | null,
    headOfDeparmentId: number | null,
    hrAuthorityId: number | null,
    branchId: number | null,
    createdBy: string,
    updatedBy: string,
    companyId: number,
    organizationId: number,
    typeHeadEmployee: string
}

export interface schedulerDetail{
    schedulerDetailId: number,
    employeeId: number,
    employeeName: string,
    departmentId: number,
    departmentName: string
}