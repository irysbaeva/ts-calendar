import React, { FC, useState } from "react";
import { Moment } from "moment";
import { Button, Select, Form, Input, DatePicker, Row } from "antd";
import { rules } from "../utils/rules";
import { IUser } from "../models/IUser";
import { IEvent } from "../models/IEvent";
import { formatDate } from "../utils/date";
import { useTypeSelector } from "../hooks/useTypesSelector";

interface EventFormProps {
  guests: IUser[];
  submit: (event: IEvent) => void;
}

const EventForm: FC<EventFormProps> = (props) => {
  const { Option } = Select;
  const [event, setEvent] = useState<IEvent>({
    author: "",
    date: "",
    description: "",
    guest: "",
  } as IEvent);

  const { user } = useTypeSelector((state) => state.auth);

  const selectDate = (date: Moment | null) => {
    if (date) {
      setEvent({ ...event, date: formatDate(date.toDate()) });
    }
  };
  const submitForm = () => {
    props.submit({ ...event, author: user.username });
  };

  return (
    <Form onFinish={submitForm}>
      <Form.Item
        label="Event name"
        name="description"
        rules={[rules.required()]}
      >
        <Input
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
          value={event.description}
        />
      </Form.Item>
      <Form.Item
        label="Event date"
        name="date"
        rules={[
          rules.required(),
          rules.isDateAfter("You can`t choose date before today"),
        ]}
      >
        <DatePicker onChange={(date) => selectDate(date)} />
      </Form.Item>
      <Form.Item label="Chose guest" name="guest" rules={[rules.required()]}>
        <Select onChange={(guest: string) => setEvent({ ...event, guest })}>
          {props.guests.map((guest) => (
            <Option key={guest.username} value={guest.username}>
              {guest.username}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Row justify="end">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default EventForm;
