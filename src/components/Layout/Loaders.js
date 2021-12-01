import React ,{useState , useEffect} from 'react'
import { css } from "@emotion/react";
import PuffLoader from "react-spinners/PuffLoader";
import '../../index.css'


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  color : black
`;

function Loaders() {
    let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#369FD7");
    return (
        <div className="loader">
         <PuffLoader color={color} loading={loading} css={override} size={150} />
        </div>
    )
}

export default Loaders
