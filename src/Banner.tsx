import { Card } from 'antd';
import Link from 'antd/es/typography/Link';

function Banner(text: string) {
    return (<Card

        style={{
            width: "100%",
            height: "100%",
            backgroundColor: '#5b25a7',
            color: '#fff', // 白色文字
            //margin:"0 0 0 0.5rem",
        }}
    ><div style={{ height: "13rem", textAlign: "center", }}>
            <div style={{
                textAlign: 'center',
                display: "flex",
                justifyContent: "center",
                alignItems: 'center',
                fontSize: '2rem', // 你可以根据需要调整字体大小
                fontWeight: 'bold', // 加粗文字
                padding: "4rem 0",
            }}>
                {text}
            </div>
            <div className="secondTitle">
                <Link href="https://github.com/The-Brotherhood-of-SCU/cg-answer" target="_blank">
                    <u className='githublink'>GitHub</u>
                </Link>
            </div>
        </div>

    </Card>)
}

export default Banner;