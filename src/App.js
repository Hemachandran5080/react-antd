import React, { useState, useEffect } from "react";
import AddNew from "./components/AddNew";
import 'bootstrap/dist/css/bootstrap.min.css';
import "antd/dist/antd.css";
import { Table, InputNumber, Popconfirm, Form, Typography } from 'antd';
import './App.css';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";


function App() {

  const [data, setData] = useState([]);
  const [done, setDone] = useState(undefined)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');


  useEffect(() => {
    setTimeout(() => {
      axios.get("/api/get")
      .then((res) => {
        setData(res.data.recordset);
        setDone(true);
      }).catch((err) => console.log(err))
    }, 5000);
  }, []);


  const deleteEmployee = (first_name) => {
    axios.delete(`/api/delete/${first_name}`);

    setData(data.filter((val) => {
      return val.first_name !== first_name;
    }));
  }

  const updateEmployee = (id) => {
    axios.put("/api/update", {
      id: id,
      first_name: first_name,
      last_name: last_name,
      email: email,
      gender: gender,
      country: country
    });

    setData(data.map((val) => {
      return val.first_name === first_name ? {
        first_name: val.first_name, 
        last_name: last_name,
        email: email,
        gender: gender,
        country: country
      }
      :val
    }));
  };


  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            // ref={node => {
            //   this.searchInput = node;
            // }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          // setTimeout(() => this.searchInput.select());
        }
      },
      render: text =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    }
  };

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText('');
  };

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };


  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      first_name: '',
      last_name: '',
      email: '',
      gender: '',
      country: '',
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
    // updateEmployee(id);
  };
  
  
  const columns = [
    {
      title: 'first_name',
      dataIndex: 'first_name',
      key: 'first_name',
      editable: true,
      sorter: {
        compare: (a, b) => a.first_name.localeCompare(b.first_name),
        multiple: 1,
      },
      ...getColumnSearchProps('first_name'),
    },
    {
      title: 'last_name',
      dataIndex: 'last_name',
      key: 'last_name',
      editable: true,
      sorter: {
        compare: (a, b) => a.last_name.localeCompare(b.last_name),
        multiple: 2,
      },
      ...getColumnSearchProps('last_name'),
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
      editable: true,
      ...getColumnSearchProps('email'),
    },
    {
      title: 'gender',
      dataIndex: 'gender',
      key: 'gender',
      editable: true,
      ...getColumnSearchProps('gender'),
    },
    // {
    //   title: 'Age',
    //   dataIndex: 'age',
    //   key: 'age',
    //   ...getColumnSearchProps('age'),
    // },
    {
      title: 'country',
      dataIndex: 'country',
      key: 'country',
      editable: true,
      ...getColumnSearchProps('country'),
    },
    {
      title: 'update',
      dataIndex: 'update',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.id)}
              // onClick={() => {updateEmployee(record.first_name)}}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: 'action',
      dataIndex: '',
      key: 'x',
      render: (text, record) => (
        <a onClick={() => {deleteEmployee(record.first_name)}}><span style={{color:"red"}}>Delete</span></a>
      ),
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });



  return (
    <>
    <div style={{display: "flex", flexDirection: "row"}}>
      <div style={{width: "60%", marginLeft: "auto", marginRight: "auto"}}>
      <Form form={form} component={false}>
      <Table 
      className="effect8"
      components={{
        body: {
          cell: EditableCell,
        },
      }}
      columns={mergedColumns} 
      dataSource={data}
      // searchableProps={{fuzzySearch:true}} 
      // exportable 
      pagination={{
        onChange: cancel,
      }}
      scroll={{y:400}}
      bordered
      rowClassName="editable-row"
      rowClassName={(record, index) => index%2 === 0 ? 'table-row-light' : 'table-row-dark'}
      />
      </Form>
      </div>
      <div>
        <AddNew />
      </div>
      <div>
        <Link to="/chart">
        <button style={{backgroundColor: "orangered", marginRight: 20}} type="submit"><span style={{color: "white"}}>Go to Charts</span></button>
        </Link>
      </div>
    </div> 
    </>
  );
}

export default App;
