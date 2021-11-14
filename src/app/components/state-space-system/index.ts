import math, {matrix, multiply, add, zeros, identity, transpose} from 'mathjs'
import { generateBoxMullerGaussian } from '../../util';

class StateSpaceSystem {

    A : math.Matrix = matrix();
    B : math.Matrix = matrix();
    C : math.Matrix = matrix();
    X : math.Matrix = matrix();
    Y : math.Matrix = matrix();
    disturbanceCovariance : number = 0;
    dt : number = 0.1;
    stateSize : number = 0;
    inputSize : number = 0;
    isDisturbed : boolean = false;
    disturbanceArray : number[] = [];

    constructor(A : number[][], B : number[][], C : number[][], dt : number) {
        this.stateSize = A[0].length;
        this.inputSize = B[0].length;
        this.dt = dt;
        this.A = (add(identity(this.stateSize), multiply(matrix(A), this.dt)) as math.Matrix);
        this.B = multiply(matrix(B),this.dt);
        this.C = matrix(C);
        this.X = matrix(zeros(this.stateSize, 1));        
    }

    addDisturbance(Qk : number) {
        this.isDisturbed = true;
        this.disturbanceCovariance = Qk;
        this.disturbanceArray = [];
        for (let n = 0; n < this.stateSize; n++) {
            this.disturbanceArray.push(0);
        }
    }

    step(input: number[][]) : math.MathArray {
        const U = matrix(input);
        if (this.isDisturbed) {
            for (let n = 0; n < this.stateSize; n++) {
                this.disturbanceArray[n] = generateBoxMullerGaussian(Math.sqrt(this.disturbanceCovariance));
            }
            this.X = (add(add(multiply(this.A, this.X),multiply(this.B,U)),transpose(matrix([this.disturbanceArray]))) as math.Matrix);
        } else {
            this.X = (add(multiply(this.A, this.X), multiply(this.B,U)) as math.Matrix);
        }        
        this.Y = multiply(this.C, this.X);
        return (this.Y.toArray())
    }
}

export default StateSpaceSystem