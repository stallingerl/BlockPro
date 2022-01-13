function woof (noise: any){
    console.log(noise && noise.one.two && noise.one.two.three);
    console.log(noise?.one?.two?.three)
}

const obj = {
    one: {
        two: {
            three: "awoo",
        },
    }
};

woof(null);