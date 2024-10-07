let getVal = function(formulaIdx){
    console.log("cf", values.cF, "lf", values.lF, "alpha", values.D)

    let lookUp_1, lookUp_2, lookUp_3

    switch(values.D){
        case 0:
            {
                 lookUp_1 = [
                    [204.25, 214.55, 212.66],
                    [201.50, 195.70, 192.58],
                    [172.42, 168.33, 166.48],
                ]
            
                 lookUp_2 = [
                    [74.91, 35.49, 15.88],
                    [55.26, 24.73, 11.13],
                    [36.77, 16.31, 7.48],
                ]
            
                 lookUp_3 = [
                    [36.68, 16.54, 7.47],
                    [27.42, 12.64, 5.78],
                    [21.33, 9.69, 4.49],
                ]
            }
            break
            
        case 30:
            {
                 lookUp_1 = [
                    [204.25, 214.55, 212.66],
                    [201.50, 195.70, 192.58],
                    [172.42, 168.33, 166.48],
                ]
            
                 lookUp_2 = [
                    [74.65, 35.02, 15.84],
                    [55.66, 24.62, 11.04],
                    [36.75, 16.29, 7.47],
                ]
            
                 lookUp_3 = [
                    [36.55, 16.32, 7.45],
                    [27.62, 12.58, 5.73],
                    [21.31, 9.68, 4.49],
                ]
            }
            break

        case 60:
            {
                 lookUp_1 = [
                    [207.94, 214.55, 212.66],
                    [201.13, 195.62, 192.56],
                    [169.77, 165.95, 164.14],
                ]
            
                 lookUp_2 = [
                    [74.38, 35.43, 15.53],
                    [56.02, 24.69, 11.09],
                    [37.31, 16.51, 7.57],
                ]
            
                 lookUp_3 = [
                    [37.21, 16.51, 7.30],
                    [27.85, 12.62, 5.76],
                    [21.98, 9.95, 4.61],
                ]
            }
            break

    }
  
    
    let col = null
    switch(values.cF){
        case 220: 
            col = 0
            break;
        case 470: 
            col = 1
            break; 
        case 1000: 
            col = 2
            break; 
    }
    
    let row = null
    switch(values.lF){
        case 1: 
            row = 0
            break;
        case 10: 
            row = 1
            break; 
        case 40: 
            row = 2
            break; 
    }

    console.log("cf", values.cF, "lf", values.lF, "alpha", values.D)
    console.log("row", row, "col", col)

    let ans = null

        if(formulaIdx == 0){
            ans = lookUp_1[row][col]
        }
        else if(formulaIdx == 1){
            ans = lookUp_2[row][col]
        }
        else{
            ans = lookUp_3[row][col]
        }
    
    console.log("row", row, "col", col, "ans", ans)

    return ans
}
const Formulas = {  
    criticalValue: 0,
    one_minus_D(D){
        return 1 - D
    },

    c_filter : {
        micro: Math.pow(10,-6),
        firingAngle(){
            let criticalValue = Formulas.criticalValue
            let firingAngle = 
                values.D <= criticalValue ? criticalValue : values.D
            firingAngle = parseFloat(firingAngle * (Math.PI/180))

            return parseFloat(firingAngle)
        },
        ac(values){
            let col = values.R == 50 ? 0 : 1
            let row
            if (values.cF == 100){
                row = 0
            } else if(values.cF == 220){
                row = 1
            } else if(values.cF == 680){
                row = 2
            } else{
                row = 3
            }


            let table  = [
                [17.5, 30.7],
                [32.5, 45.3],
                [52.3, 62.0],
                [58.1, 66.8],
            ]

            let ans = table[row][col]
            ans = Number(ans).toFixed(4)
            Formulas.criticalValue = parseFloat(ans)
            return ans
        },

        vm(values){
            let ans = Math.sqrt(2) * values.vIn  
            return parseFloat(Number(ans).toFixed(4))
        },
        vpp(values){

            let f = 50
            let w = 2 * Math.PI * f
            let cF = values.cF * this.micro
            let firingAngle = this.firingAngle()
   
            // console.log("FA: ",firingAngle)

            let numerator = parseFloat((Math.PI/2) + firingAngle).toFixed(4)
            let denominator = parseFloat(w * values.R * cF).toFixed(4)
            let power = parseFloat(-(numerator / denominator))
            let oneMinusExp = 1 - Math.exp(power)
            
            
            let ans = this.vm(values) * oneMinusExp

            console.log(
`numerator: ${numerator}
denominator: ${denominator}
power: ${power}
exp: ${Math.exp(power)}
oneMinusExp: ${oneMinusExp}
vm * oneMinusExp: ${ans}`
            )

            return parseFloat(Number(ans).toFixed(4))
        },
        vdc(values){

            let f = 50
            let w = 2 * Math.PI * f
            let cF = values.cF * this.micro
            let firingAngle = this.firingAngle()


            let numerator = ((Math.PI/2) + firingAngle)
            let denominator = w * values.R * cF;
            let power = -(numerator / denominator)
            let val = (1/2) + Math.exp(power)


            let ans = this.vm(values) * val
            return parseFloat(Number(ans).toFixed(4))
        },
        vac(values){
            let ans = this.vpp(values) / ( 2 * Math.sqrt(2))
            return parseFloat(Number(ans).toFixed(4))
        },
        i0(values){
            let ans = this.vdc(values) / values.R
            return parseFloat(Number(ans).toFixed(4))
        },
        rf(values){
            let ans =  this.vac(values) / this.vdc(values)
            return parseFloat(Number(ans).toFixed(4))
        },
    },

    lc_filter: {
        v0(values){
            let val = getVal(0)
          
            if(values.vIn == 220){
                ans = val
            }
            else{
                ans = val * (values.vIn / 220)
            }
            
            return Number(ans).toFixed(4)
        },
        vpp(values){
            let val = getVal(1)
          
            if(values.vIn == 220){
                ans = val
            }
            else{
                ans = val * (values.vIn / 220)
            }
            
            return Number(ans).toFixed(4)
        },
        rf(values){
            let val = getVal(2)
          
            if(values.vIn == 220){
                ans = val
            }
            else{
                ans = val * (values.vIn / 220)
            }
            
            return Number(ans).toFixed(4)
        },
    },

}
//* D is alpha , vIn is vs, R is r
// L is inductance , lF is l filter value , cF is c filter value

let values = {
    vIn:0,
    D:0,
    R:0,
    L:0,
    lF:0,
    cF:0,
}

function updateValues(vIn,D,R,L,lF=0, cF=0){
    values = {
        vIn:vIn,
        // convert alpha to radion
        // D: (D * (pie/180)),
        D:D ,
        R:R,
        L:L,
        lF:lF,
        cF:cF,
    }
}

