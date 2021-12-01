import React from 'react'
import {Link} from "react-router-dom"

function SignedInLinks() {
    return (
        <div>
             <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Logout
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  About
                </Link>
              </li>
              </ul>
        </div>
    )
}

export default SignedInLinks
