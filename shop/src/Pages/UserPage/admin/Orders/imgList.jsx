import React,{useState} from "react";
import '../../../../components/css/imgList.css'



const imgList=({imgList,id,list})=>{
    const imgId=1;
    let mainImg="";
    function gh(gg){
        mainImg=gg
    }
    console.log(imgList)
    //setMainImg(imgList[0])
    return(
        <div className="imgSlot" style={{display:"block"}}>
            <img className="mainImg" src={"https://master43.ru:8443/"+list+"/"+id+"/"+mainImg}/>
            <div style={{display:"flex"}}>
            {imgList.map(el =>(
                <div className={"additionalImg"}>
                    <img onClick={gh("http://localhost:3001/"+list+"/"+id+"/"+el)} src={"http://localhost:3001/"+list+"/"+id+"/"+el}/>
                </div>
            ))}
            </div>
        </div>
    )
}
export default imgList