import React, {useState} from "react";

function ListGroup({Number}){
    const [selectedNumber, setSelectedNumber] = useState(null);

    return (
        //<div style={{width: "50%", textAlign: "left"}}>
        <div>
        <ol>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <li
            key={num}
            onClick={() => {
                setSelectedNumber(num);
                Number(num);
            }}
            style={{ //background: selectedNumber === num ? "blue" : "#323236",
            fontFamily: "Trebuchet MS, sans-serief",
            fontSize: "30px",
            margin: "5pxx 0",
            padding: "18px",
            cursour: "pointer"
            }}
            >
            {/*num*/}
            </li>
        ))}
        </ol>
        </div>
    );
    }

export default ListGroup;