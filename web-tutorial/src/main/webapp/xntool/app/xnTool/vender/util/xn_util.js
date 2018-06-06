
var xn_utail ={
    getCodeColor :function(unionId)
    {
        var colorCode = ["#65b3fe", "#ffb343", "#ee5e54", "#55c36e", "#55b2c3", "#799cf2", "#f6ca1b", "#cf8af6", "#68ccb1", "#ec89d4"];
        return colorCode[unionId%10];
    }
}