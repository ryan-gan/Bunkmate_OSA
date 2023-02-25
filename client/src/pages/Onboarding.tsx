import { useContext, useState } from "react"
import "../styles/Onboarding.css"
import Navlink from "../components/onboarding/NavLink"
import mock from "../mock"
import Form from "../components/onboarding/Form"
import React from "react"
import { UserContext } from "../components/context/UserContext"
import { gql, useMutation, useQuery } from "@apollo/client"


const UPDATE_USER = gql`
  mutation updateUser($user: UserInput!) {
    updateUser(user: $user){
      email
    }
  }
`



const Onboarding = () => {

    const [activeSection, setActiveSection] = useState(0)
    const {user, onboardingChange} = useContext(UserContext)
    const [showing, setShowing] = useState(false)
    const [updateUser, {data, loading, error}] = useMutation(UPDATE_USER)

    const selectLiving = (e:any) => {
        onboardingChange(e, "onCampus")
        setShowing(true)
    }

    //called when submit button is pressed on last section
    const onFinished = () => {
        updateUser({variables: user, onCompleted: () => console.log(data)})
    }
    return (
        <div className="onboarding">
             <div className="nav">
                {mock.mockSections.map(mockSection=><Navlink key={mockSection.id} activeSection={activeSection} id={mockSection.id} name = {mockSection.name}/>)}
            </div>
            
            {(showing || activeSection!==1)? mock.mockForms.map(form=><Form onFinished={onFinished} show={activeSection===form.id} activeSection={activeSection} setActiveSection={setActiveSection}  key={form.id} id={form.id} welcome={form.welcome} header={form.header} fields={form.fields}/>): 
            
            <div className="living">
                <h1>
                    Nice to meet you, <span className="name">{user.fullName}</span>
                </h1>
                <h2 >
                    Where will you be living?
                </h2>
                <div className="bubbles">
                    <button onClick={(e)=>{selectLiving(e)}}>
                        On Campus
                    </button>
                    <button onClick={(e)=>{selectLiving(e)}}>
                        Off Campus
                    </button>   
                </div>
            </div> } 
        </div>
    )
}   

export default Onboarding