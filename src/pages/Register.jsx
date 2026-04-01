import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../AuthenticationPage/Authentication";
import { Button, Checkbox, Form, Input, Card, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Register = () => {
  const navigate = useNavigate();
  const { register, loading, error, clearError, isAuthenticated } = useAuth();
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleValuesChange = () => {
    if (error) clearError();
    if (localError) setLocalError(null);
  };

  const handleSubmit = async (values) => {
    if (values.password !== values.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    const result = await register(values.email, values.password);
    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-blue-50 to-white">
      <Card
        className="w-full max-w-md p-8 shadow-lg"
        style={{ borderRadius: 16 }}
      >
        <Title level={2} className="text-center mb-4">
          Create Account
        </Title>
        <Text className="text-center text-gray-500 block mb-6">
          Register to start organizing your tasks
        </Text>

        {(error || localError) && (
          <Text type="danger" className="block mb-4 text-center">
            {localError || error}
          </Text>
        )}

        <Form
          name="register"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          onValuesChange={handleValuesChange}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="name@example.com"
              disabled={loading}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              disabled={loading}
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm your password"
              disabled={loading}
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox disabled={loading}>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </Form.Item>
        </Form>

        <Text className="text-center text-sm block">
          Already have an account? <Link to="/login">Login</Link>
        </Text>
      </Card>
    </div>
  );
};

export default Register;
