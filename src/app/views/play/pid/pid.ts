class PID {
    kp : number = 0;
    ki : number = 0;
    kd : number = 0;
    dt : number = 0;
    accumulatedError : number = 0;
    derivativeError : number = 0;
    previousError : number = 0;
    setpoint : number = 0;

    constructor(dt : number) {
        this.dt = dt;
    }

    setPGain(kp : number) {
        this.kp = kp;
    }

    setIGain(ki : number) {
        this.ki = ki;
    }

    setDGain(kd : number) {
        this.kd = kd;
    }

    setSetpoint(setpoint : number) {
        this.setpoint = setpoint;
    }

    setGains(kp : number, ki : number, kd : number) {
        this.setPGain(kp);
        this.setIGain(ki);
        this.setDGain(kd);
    }

    resetAccumulatedError() {
        this.accumulatedError = 0;
    }

    step(measurement : number) : number {
        const error = this.setpoint - measurement;
        this.accumulatedError += error;
        this.derivativeError = error - this.previousError;

        const output = this.kp * error + this.ki * this.accumulatedError * this.dt + this.kd * this.derivativeError / this.dt;
        this.previousError = error;
        return output;
    }
}

export default PID;