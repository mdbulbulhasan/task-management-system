import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../AuthenticationPage/Authentication";
import { Button, Checkbox, Form, Input, Card, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (values) => {
    const result = await login(values.email, values.password);
    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Card
        className="w-full max-w-md p-8 shadow-lg"
        style={{ borderRadius: 16 }}
      >
        <Title level={2} className="text-center mb-4">
          Welcome Back
        </Title>
        <Text className="text-center text-gray-500 block mb-6">
          Login to continue managing your tasks
        </Text>

        {error && (
          <Text type="danger" className="block mb-4 text-center">
            {error}
          </Text>
        )}

        <Form
          name="login"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
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

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox disabled={loading}>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>

        <Text className="text-center text-sm block">
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </Text>
      </Card>
    </div>
  );
};

export default Login;
