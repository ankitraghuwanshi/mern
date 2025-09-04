import React from 'react'
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from '../api/users';


function Login() {

  //const [messageApi, contextHolder] = message.useMessage()
  //nagivate after register successfully
  const navigate = useNavigate()

  const onFinishLoginForm = async (values)=>{
    //console.log({values})
    try {
      const response = await loginUser(values)
      
      if(response.success){
        message.success("logged in successfully")

        //string jwt token to localstorage
        localStorage.setItem("token", response.token)

        //navigate to admin/login/partner after registred successfully
        if(response.role === "Admin"){
          return navigate("/home")
        }else if(response.role === "Partner"){
          return navigate("/partner")
        }else{
          return navigate("/")
        }

      }else{
        message.error("something went wrong (response.success if-else)")
      }

    } catch (error) {
      message.error("something went wrong")
      console.log(error)
    }
  }

  return (
    <>
    <header className="App-header">
      <main className="main-area mw-500 text-center px-3">
        <section className="left-section">
          <h1>Login to BookMyShow</h1>
        </section>

        <section className="right-section">
          <Form onFinish={onFinishLoginForm} layout="vertical">
    
          <Form.Item
              label="Email"
              htmlFor="email"
              name="email"
              className="d-block"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input
                id="email"
                type="text"
                placeholder="Enter your Email"
              ></Input>
            </Form.Item>

            <Form.Item
              label="Password"
              htmlFor="password"
              name="password"
              className="d-block"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input
                id="password"
                type="password"
                placeholder="Enter your Password"
                
              ></Input>
            </Form.Item>

            <Form.Item className="d-block">
              <Button
                type="primary"
                block
                htmlType="submit"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <div>
            <p>
              New User? <Link to="/register">Register Here</Link>
            </p>
          </div>
        </section>
      </main>
    </header>
    </>
  )
}

export default Login