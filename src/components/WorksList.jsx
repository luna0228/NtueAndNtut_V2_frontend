import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spin, Select, Space, Tag, Dropdown, Button } from 'antd';
import { LoadingOutlined, DownOutlined } from '@ant-design/icons';
import WorkItem from "./WorkItem";
import WorkBanner from "./WorkBanner";
import Pagination from "./Pagination";
import WorksListJson from "../json/WorksList.json"
import { getWorksListBySchoolSemester, filterWorksListBySkillmultiple } from "../api";

export default function WorksList({ school, semester }) {

    //非同步接資料 from json
    const [WorksList, setWorksList] = useState(null);
    const [WorksListForBanner, setWorksListForBanner] = useState(null);

    //耕締以下新增
    const [currentPage, setCurrentPage] = useState(1); //新增當前頁碼為1，以及移動頁碼規則
    const [windowWidth, setWindowWidth] = useState(window.innerWidth); //新增頁面寬度為螢幕目前寬度（window.innerWidth），以及螢幕變化規則
    // const itemsPerPage = windowWidth <= 576 ? WorksList.length : 12; // 1229排錯：這邊直接寫上WorksList.length=null會導致崩潰，因為會無法在讀取任何屬性
    const itemsPerPage = windowWidth <= 576 ? (WorksList ? WorksList.length : 0) : 12; //1229修正：WorksList ? WorksList.length : 0是關鍵，這樣寫他會先檢查是否存在，再判斷為真(不是null)的運算，或者為假（是null）的運算
    const semesterData = WorksList || []; //const semesterData = WorksList[school]?.[semester] ?? [];應用可選鏈與空值合併運算子，確保資料缺失時依然有個空陣列可用
    //WorksList會直接接到 指定學校(school)、學期(semester)的資料，所以寫法改變
    const totalWorks = semesterData.length; //宣告要處理的總卡片數值等同於學期卡片數的數量
    const totalPages = Math.ceil(totalWorks / itemsPerPage); //運算所需要的頁數
    // 定義頁數的切片 //sort 依照變數排序(clkcnt)
    const currentWorks = semesterData.sort((a, b) => b.clkcnt - a.clkcnt).slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // 使用 useEffect 鉤子來監聽瀏覽器窗口的大小變化，因為要判斷576px視窗時把更動每頁顯示的卡片數。如果寬度變化時自動更新windowWith的數字
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth); // 讓handleResize來記錄視窗變化
        window.addEventListener("resize", handleResize); //當視窗大小更動時，執行handleResize。.addEventListener是一種監聽指令
        return () => window.removeEventListener("resize", handleResize); //清理監聽器用
    }, []); //頁面第一次執行時，會做一次偵測。


    // 使用 useEffect 来獲取列表數據，採用非同步的處理。 from api
    useEffect(() => {
        const getWorksListData = async (school, semester) => {
            const response = await getWorksListBySchoolSemester(school, semester);
            if (Array.isArray(response)) { //確保接到的資料是陣列
                setWorksList(response);
            } else {
                setWorksList([]);
            }
            console.log("Updated WorksList:", response); //用於後台判斷
        }
        // const getWorksListData = async () => {
        //     const response = await getWorksList(); // 等待 getWorksList 函數完成，並將返回的數據儲存到 response 變量中
        //     setWorksList(response); //做一個呼叫與更新
        //     console.log("Updated WorksList:", response); //用於後台判斷
        // }
        getWorksListData(school, semester); //創建好後直接宣告
    }, [school, semester]);
    /* 第二個參數是用來限定當哪些變數被改變時useEffect要觸發 */


    // 使用 useEffect 来獲取列表數據，採用非同步的處理。 from api ,only for banner
    useEffect(() => {
        const getWorksListDataForBanner = async (school, semester) => {
            const response = await getWorksListBySchoolSemester(school, semester);
            if (Array.isArray(response)) { //確保接到的資料是陣列
                setWorksListForBanner(response);
            } else {
                setWorksListForBanner([]);
            }
            console.log("Updated WorksListForBanner:", response); //用於後台判斷
        }
        getWorksListDataForBanner(school, semester); //創建好後直接宣告
    }, [school, semester]);


    console.log("Current WorksList:", WorksList);
    console.log("Current WorksListForBanner:", WorksListForBanner);
    console.log(school + "," + semester);
    console.log("Current Works:", currentWorks);
    console.log("Total Works:", totalWorks);
    console.log("Total Pages:", totalPages);





    //以下為篩選內容
    //定義學期路徑
    const items = [
        {
            label: <Link to={`/works/${school}/112-1`}>112期中</Link>,
            key: '0',
        },
        {
            label: <Link to={`/works/${school}/111-2`}>111期末</Link>,
            key: '1',
        },
        {
            label: <Link to={`/works/${school}/111-1`}>111期中</Link>,
            key: '2',
        },
        {
            label: <Link to={`/works/${school}/110-2`}>110期末</Link>,
            key: '3',
        },
        {
            label: <Link to={`/works/${school}/110-1`}>110期中</Link>,
            key: '4',
        },

    ];
    //多選TAG
    const options = [
        { value: 'HTML' },
        { value: 'CSS' },
        { value: 'JavaScript' },
        { value: 'Typescript' },
        { value: 'Bootstrap' },
        { value: 'RWD' },
        { value: 'PHP' },
        { value: 'MySQL' },
        { value: 'jQuery' },
        { value: 'Git版控' },
        { value: 'React' },
        { value: 'Firebase' },
        { value: 'Lottie' },
        { value: 'GASP' },
        { value: 'SCSS' },
        { value: 'animate.css' },
        { value: 'normalize.css' },
        { value: 'album.js' },
        { value: 'aos.js' },
        { value: 'login.js' },
        { value: 'masonry.js' },
        { value: 'ScrollTrigger.min.js' },
        { value: 'slick.js' },
        { value: 'wow.js' },
        { vaule: 'ASP.NET' },

    ];

    const tagRender = (props) => {
        const { label, value, closable, onClose } = props;
        const onPreventMouseDown = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
                className="tag"
                // color="#ACD2BF"
                style={{
                    marginBottom: "1px",
                }}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}

            >
                {label}
            </Tag>
        );
    };


    const [selectedItems, setSelectedItems] = useState([]);
    const getFilterWorksListData = async (school, semester, skill1, skill2, skill3) => {
        const response = await filterWorksListBySkillmultiple(school, semester, skill1, skill2, skill3);
        if (Array.isArray(response)) { //確保接到的資料是陣列
            setWorksList(response);
        } else {
            setWorksList([]);
        }
        console.log("Updated FilterWorksList:", response); //用於後台判斷
    }

    //篩選 觸發
    const handleSelectChange = (selected) => {
        console.log(selected) //selected是串列
        console.log('selected:' + selected[0] + ',' + selected[1] + ',' + selected[2])
        const skills = selected.slice()
        let skill1 = '', skill2 = '', skill3 = ''
        if (selected.length == 3) {
            skill1 = skills[0]
            skill2 = skills[1]
            skill3 = skills[2]
        }
        else if (selected.length == 2) {
            skill1 = skills[0]
            skill2 = skills[1]
            skill3 = null
        }
        else if (selected.length == 1) {
            skill1 = skills[0]
            skill2 = null
            skill3 = null
        }

        getFilterWorksListData(school, semester, skill1, skill2, skill3)
        setSelectedItems(selected);
    };

    return (


        <div className="worksListBox">
            <div className="container">
                <div className="workBannerOuter">
                    {WorksListForBanner === null || WorksListForBanner === undefined || WorksListForBanner.length === 0 ?
                        <div><h1 style={{ backgroundColor: "#ACD2BF" }}>Loading..<Spin
                            className="spin"
                            size="large"
                            indicator={
                                <LoadingOutlined
                                    style={{
                                        fontSize: 24,
                                    }}
                                    spin
                                />
                            }
                        /></h1></div>
                        :
                        <WorkBanner WorksListForBanner={WorksListForBanner} school={school}
                            semester={semester} />
                    }
                </div>

                <div className="rightBar">
                    <div className="dropdown">
                        <Dropdown
                            menu={{ items }}
                            trigger={['click']}
                        >
                            <Button className="dropdownbutton"
                                onClick={(e) => e.preventDefault()}>
                                <Space className="text">
                                    分類
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                    </div>

                    <div className="select">
                        <Space
                            className="space"
                            style={{
                                width: "250px",
                            }}
                            direction="vertical"
                        >
                            <Select
                                className="selectmultiple"
                                mode="multiple"
                                listHeight={130}
                                // value={selectedItems}
                                onChange={handleSelectChange}
                                allowClear
                                tagRender={tagRender}
                                // defaultValue={['gold', 'cyan']}
                                style={{
                                    width: "350px",
                                }}
                                disabled={
                                    selectedItems.length >= 3
                                        ? true
                                        : false
                                }
                                options={options}

                            />
                        </Space>
                    </div>
                </div>

                <ul className="worksList">

                    {/* 使用 map 函数来渲染 currentWorks 中的每个作品 */}
                    {currentWorks.map((work, index) => (
                        <WorkItem
                            key={index}
                            WorksListSemester={work}
                            worksName={school}
                            worksSemester={semester} />
                    ))}
                </ul>
                {/* 使用 Pagination 组件来渲染页码。同時確保給予正確的屬性。並且處裡只有數據情況下顯示分頁組件 */}
                {totalPages > 1 && ( //&&是且的意思，左邊為真實，後續的渲染才會執行
                    <Pagination
                        current={currentPage}
                        onChange={(page) => setCurrentPage(page)}
                        total={totalWorks}
                        pageSize={itemsPerPage}
                    />
                )}
            </div>
        </div>

    )
}