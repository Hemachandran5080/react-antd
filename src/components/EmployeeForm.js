import React, { useEffect, useState } from 'react'
import { Form, Input, Button } from 'antd';
import axios from "axios";


function EmployeeForm() {

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');

  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    axios.get("/api/get")
      .then((res) => {
        setEmployeeList(res.data.recordset);
      })
      .catch((err) => console.log(err))
  }, [employeeList]);


    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };


    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            // number: '${label} is not a valid number!',
        },
        // number: {
        //     range: '${label} must be between ${min} and ${max}',
        // },
    };

      const onFinish = (values) => {
        console.log(values);
    };

    const submitForm = () => {
      axios.post("/api/insert", {
        first_name: first_name,
        last_name: last_name,
        email: email,
        gender: gender,
        age: age,
        country: country
      });

      setEmployeeList([
        ...employeeList,
        {first_name: first_name, last_name: last_name, email: email, gender: gender, age: age, country: country}
      ]);

    }


    return (
      <>
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item
          name={['user', 'firstName']}
          label="First Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input onChange={(e) => {
            setFirstName(e.target.value);
          }} />
        </Form.Item>
        <Form.Item
          name={['user', 'lastName']}
          label="Last Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input onChange={(e) => {
            setLastName(e.target.value)
          }} />
        </Form.Item>
        <Form.Item
          name={['user', 'email']}
          label="Email"
          rules={[
            {
              type: 'email',
            },
          ]}
        >
          <Input onChange={(e) => {
            setEmail(e.target.value)
          }} />
        </Form.Item>
        {/* <Form.Item
          name={['user', 'age']}
          label="Age"
        >
          <Input onChange={(e) => {
            setAge(e.target.value)
          }} />
        </Form.Item> */}
        <Form.Item
          name={['user', 'gender']}
          label="Gender"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input onChange={(e) => {
            setGender(e.target.value)
          }} />
        </Form.Item>
        <Form.Item name={['user', 'country']} label="Country">
          <Input onChange={(e) => {
            setCountry(e.target.value)
          }} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button style={{backgroundColor: "orange"}} type="primary" htmlType="submit" onClick={submitForm}>
          Submit
        </Button>
      </Form.Item>
      </Form>
    </>
    )
}

export default EmployeeForm
