const parser = require('../inputparser');

const findClaimedCoordinates = input => {
    const coordinates = {};
    input.forEach(claimString => {
        let claim = parseClaim(claimString);
        for (let W = 0; W < claim.width; W++){
            for (let H = 0; H < claim.height; H++){
                let x = parseInt(claim.x);
                let y = parseInt(claim.y);
                let coordinate = `${x+W},${y+H}`;

                if (!coordinates[coordinate]) {
                    coordinates[coordinate] = [claim];
                } else {
                    coordinates[coordinate].push(claim);
                }
            }
        }
    });

    return coordinates;
}

const calcOverlap = coordinates => {
    let overlapping = 0;
    Object.keys(coordinates).map(coord => {
        let claims = coordinates[coord].length;
        if (claims > 1) {
            overlapping++;
        }
    });
    return overlapping;
}

const findNonOverlappingClaim = (coordinates) => {
    let singleClaimsOnCoordinates = Object.keys(coordinates).filter(key => {
        if (coordinates[key].length === 1) {
            return key;
        }
    }).map(key => {
        return coordinates[key][0];
    });

    let claims = {};
    singleClaimsOnCoordinates.forEach(claim => {
        if (!claims[claim.claimId]) {
            claims[claim.claimId] = claim.height * claim.width;
        }
    });

    let numClaims = {};
    singleClaimsOnCoordinates.forEach(square => {
        if (!numClaims[square.claimId]) {
            numClaims[square.claimId] = 1
        } else {
            numClaims[square.claimId]++;
        }
    });

    let nonOverlappingClaims = [];
    Object.keys(claims).forEach(claimId => {
        if (numClaims[claimId] === claims[claimId]) {
            nonOverlappingClaims.push(claimId);
        }
    });

    return nonOverlappingClaims;
}

const parseClaim = input => {
    input = input.match(/[^\\r]/ig).join("");

    let claim = input.match(/^#[0-9]*/i)[0];
    let coordinates = input.match(/[0-9]*,[0-9]*/ig)[0].split(",");
    let size = input.match(/[0-9]*x[0-9]*/ig)[0].split("x");
    
    return {
        claimId: claim,
        x: coordinates[0],
        y: coordinates[1],
        width: size[0],
        height: size[1]
    }
}

let input = parser.parse('./input.txt');
let test = parser.parse('./test.txt');

let claimedCoordinates = findClaimedCoordinates(input);
let testCoordinates = findClaimedCoordinates(test);


console.log(calcOverlap(claimedCoordinates));
console.log();
console.log(findNonOverlappingClaim(claimedCoordinates));