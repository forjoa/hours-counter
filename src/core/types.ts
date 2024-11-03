export interface ApiResponse {
    message: string
    success: boolean
}

export interface User {
    userid?: number
    name: string
    lastname: string
    email: string
    password?: string
    createdat?: string
    updatedat?: string
}

export interface WorkCenter {
    workcenterid?: number
    name: string
    userid: number
    createdat: string
}

export interface Hour {
    hourid: number;
    day: string;
    starttime: string;
    endtime: string;
    workcenterid: number;
    userid: number;
    annotations: string;
    createdat: string;
    name: string;
}

export interface WorkShift {
    hourId: number;
    day: string;
    startTime: string;
    endTime: string;
    workCenterId: number;
    userId: number;
    annotations?: string;
    createdAt: string;
}
