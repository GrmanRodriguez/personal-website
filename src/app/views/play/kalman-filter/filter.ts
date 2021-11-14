import {matrix, multiply, add, transpose, subtract, inv, identity, zeros, size} from "mathjs";

class Filter {
    A : math.Matrix = matrix();
    B : math.Matrix = matrix();
    C : math.Matrix = matrix();
    Qk : math.Matrix = matrix();
    Rk : math.Matrix = matrix();
    x : math.Matrix = matrix();
    P : math.Matrix = matrix();
    xPriori : math.Matrix = matrix();
    PPriori : math.Matrix = matrix();
    gain : math.Matrix = matrix();

    constructor(A : math.Matrix, B : math.Matrix, C : math.Matrix, Qk : number[][], Rk : number[][], initialX : number[][], known : boolean = false, initialP : number[][] = [[]]) {
        this.A = A;
        this.B = B;
        this.C = C;
        this.Qk = matrix(Qk);
        this.Rk = matrix(Rk);
        this.x = matrix(initialX);
        if (known) {
            this.P = (zeros(size(this.A) as number[]) as math.Matrix);
        } else {
            this.P = matrix(initialP);
        }        
    }

    predict(input : number[][]) : void {
        let u = matrix(input);
        this.xPriori = (add(multiply(this.A, this.x), multiply(this.B, u)) as math.Matrix);
        this.PPriori = (add(multiply(this.A, multiply(this.P, transpose(this.A))),this.Qk) as math.Matrix);
    }

    update(measurement : number[][]) : void {
        let z = matrix(measurement);
        let residualPriori = (subtract(z, multiply(this.C, this.xPriori)) as math.Matrix);
        let residualCovariance = (add(multiply(this.C, multiply(this.PPriori,transpose(this.C))),this.Rk) as math.Matrix);
        this.gain = (multiply(this.PPriori, multiply(transpose(this.C),inv(residualCovariance))) as math.Matrix);
        this.x = (add(this.xPriori, multiply(this.gain, residualPriori)) as math.Matrix);
        this.P = (multiply(subtract(identity(size(this.P)), multiply(this.gain,this.C)), this.PPriori) as math.Matrix);
    }

    step(input : number[][], measurement : number[][]) : math.MathArray {
        this.predict(input);
        this.update(measurement);
        return (multiply(this.C, this.x) as math.Matrix).toArray();
    }
}

export default Filter;