import Classes from "./UserInformation.module.css";
import { Form, Input, Select, ConfigProvider } from "antd";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserInformation = () => {
  const [form] = Form.useForm();
  const Navigate = useNavigate();

  /**
   * Handler function for form submit button used to save form values into the database
   * and navigate to other routes based on the role
   * @param {*} values 
   */

  
  const onFinish = async (values) => {
    console.log(JSON.stringify(values));
    const obj ={
      email:localStorage.getItem("user"),
      firstName:values.firstName,
      lastName:values.lastName,
      address:values.address,
      city:values.city,
      nearestPopularPlace:values.nearestPlace,
      phoneNumber:values.mobile
    };

    console.log("obj",obj)
    const response = await fetch(
      "http://localhost:8080/api/userInfo/updateUserInformation",
      {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const message = "An error has occured";
      console.log(message);
    }

    if(localStorage.getItem('role') === 0){
      //Navigate('/adminPage');
    }else{
      Navigate('/');
    }
  };

  return (
    <ConfigProvider direction="rtl">
      <div className={Classes.container}>
        <div className={Classes.line}>
          يرجى ملأ هذا االستبيان لجمع المعلومات اللازمة للتواصل عند إجراء بعض
          العمليات التي تتطلب ذلك:
        </div>
        <div className={Classes.formContainer}>
          <ToastContainer />
          <Form
            name="basic"
            form={form}
            className={Classes.form}
            onFinish={onFinish}
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            direction="rtl"
          >
            <Form.Item
              className={Classes.formItem}
              label="الإسم الاول"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "الرجاء إدخال الإسم الاول",
                },
              ]}
            >
              <Input autoComplete="off"/>
            </Form.Item>

            <Form.Item
              className={Classes.formItem}
              label="إسم العائلة"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "الرجاء إدخال إسم العائلة",
                },
              ]}
            >
              <Input autoComplete="off"/>
            </Form.Item>

            <Form.Item
              className={Classes.formItem}
              name="city"
              label="المدينة"
              rules={[
                {
                  required: true,
                  message: "الرجاء إختيار المدينة",
                },
              ]}
            >
              <Select
                id="city_select"
                style={{ width: "100%" }}
                className={Classes.select}
                placeholder="إضغط لإختيار المدينة"
                size="large"
                showSearch
                allowClear
                optionFilterProp="value"
                filterOption={(input, option) => option.value.includes(input)}
                filterSort={(optionA, optionB) => {
                  optionA.value
                    .toLowerCase()
                    .localeCompare(optionB.value.toLowerCase());
                }}
              >
                <Select.Option value="جنين">جنين</Select.Option>
                <Select.Option value="نابلس">نابلس</Select.Option>
                <Select.Option value="قلقيليه">قلقيليه</Select.Option>
                <Select.Option value="سلفيت">سلفيت</Select.Option>
                <Select.Option value="أريحا">أريحا</Select.Option>
                <Select.Option value="رام الله">رام الله</Select.Option>
                <Select.Option value="القدس">القدس</Select.Option>
                <Select.Option value="بيت لحم">بيت لحم</Select.Option>
                <Select.Option value="الخليل">الخليل</Select.Option>
                <Select.Option value="غزة">غزة</Select.Option>
                <Select.Option value="طوباس">طوباس</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              className={Classes.formItem}
              label="العنوان"
              name="address"
              rules={[
                {
                  required: true,
                  message: "الرجاء إدخال العنوان",
                },
              ]}
            >
              <Input autoComplete="off"/>
            </Form.Item>

            <Form.Item
              className={Classes.formItem}
              label="أقرب مكان معروف"
              name="nearestPlace"
              rules={[
                {
                  required: true,
                  message: "الرجاء إدخال العنوان المناسب",
                },
              ]}
            >
              <Input autoComplete="off"/>
            </Form.Item>

            <Form.Item
              className={Classes.formItem}
              label=" رقم الجوال"
              name="mobile"
              rules={[
                {
                  required: true,
                  message: "الرجاء إدخال رقم الجوال",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item className={Classes.btn}>
              <button className={Classes.submitBtn} type="submit">
                حفظ
              </button>
            </Form.Item>
          </Form>
        </div>

        <div className={Classes.footer}>
          <p>
            ملاحظة : سوف يتم إضافة الطلب إلى النظام ، بعد التأكد من صحة
            المعلومات المدخلة من قبل فريقنا المختص
          </p>
          <p>شكراً لكم </p>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default UserInformation;
