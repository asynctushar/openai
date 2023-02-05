import { Button, Input, message as messageHook } from 'antd';
import { useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [message, setMessage] = useState('');
    const [sendData, setSendData] = useState('');
    const [reply, setReply] = useState('');
    const [messageApi, contextHolder] = messageHook.useMessage();


    const onSubmit = async () => {
        if (message.length < 1) return;

        setSendData(message);
        setMessage('');
        setReply('');

        try {
            const { data } = await axios.post("/api/v1/message", { message }, { headers: { 'Content-Type': 'application/json' } })

            setReply(data.message);
        } catch (err) {
            messageApi.open({
                type: 'error',
                content: err.response.data.message,
            });
        }

    }
    return (
        <div className="flex items-center justify-center flex-col mt-10 text-left">
            {contextHolder}
            <Input.Group compact className="w-10/12 sm:w-96">
                <Input onKeyUp={(e) => e.key === 'Enter' && onSubmit()} placeholder="Enter message" className="placeholder:text-zinc-700 !w-8/12 h-12" value={message} onChange={(e) => setMessage(e.target.value)} />
                <Button onClick={onSubmit} className="!w-4/12 h-12 font-medium dark:text-zinc-200 dark:border-zinc-500">Submit</Button>
            </Input.Group>
            <p className={` w-5/6 md:w-96 mt-12 dark:text-zinc-300 ${sendData.length < 1 ? "hidden" : "block"}`}><strong className="mr-1">You:</strong>{sendData}</p>
            <p className={` w-5/6 md:w-96 mt-6 dark:text-zinc-300 ${reply.length < 1 ? "hidden" : "block"}`}><strong className="mr-1">AI: </strong>{reply}</p>
        </div>
    )
}
export default Home;