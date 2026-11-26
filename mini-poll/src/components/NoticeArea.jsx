import "../css/noticeArea.css"
function NoticeArea(props) {
    return (
        <p className="notice-area">{props.message}</p>
    )
}
export default NoticeArea;