Back-end Questions

1. Assuming the system currently has three microservices: Customer API, Master Data API,
and Transaction Data API, there is a new feature that requires data from all three
microservices to be displayed in near real-time. The current technology stack includes
REST APIs and an RDBMS database. How would you design a new API for this feature?

จากโจทย์คิดว่าการที่ดึงเดต้าจากทั้ง 3 microservices คงไม่พ้นจะต้องทำ cache จึงอาจจะต้องใช้ tools ตัวอย่างเช่น Redis มาช่วย ส่วนเรื่องเวลาของของที่จะส่งไปเพื่อแสดงผลที่หน้าบ้านตามโจทย์ near Realtime คิดว่าคงต้องใช้ tools ในการ โอเคก่อนจะเริ่ม optimize ในส่วนของ Redis และ WebSocket เรามาดูส่วนของโค้ดกันก่อนว่า เราจะสามารถทำอะไรกับมันได้มั้งกับขั้นตอน aggregator service ซึ่งในส่วนนี้ไม่ทราบว่าความยาวของท่อนนี้ขนาดไหน จำเป็นมีฟังก์ชั่น run parallel ไหมแต่คิดว่าสามารถ optimize บางฟังก์ชั่นด้วยการย่อย function เป็น function ละ job บางjobอาจจะสามารถ optimize ด้วย algorithm, hash map หรือลดความบางอย่างไม่จำเป็นออก ลดความซับซ้อนของโค้ด แต่ก่อนจะยาวมาถึงท่อน Rest API เราสามารถแวะมาลดความน่ารำคานของ RDBMS  ได้ โดยเริ่มจากการ design database ขั้นแรก ลดความซับซ้อนลดการคิวรี่หลายขั้น และก็ซอย job query ออกเป็น service ย่อยๆทำ indexing จริงๆอยากพูดถึงเรื่อง EDA แต่ผมก็ยังไม่เคยลองจริงๆซักที โอเคครับถึงตรงนี้ผมก็ยังมีข้อส่งสัยว่าเดต้าท่อนนี้เรียกบ่อยแค่ไหนครับรวมถึงเปลี่ยนบ่อยขนาดไหนหรือเราสามารถ นำโจทย์ข้อนี้ไปเล่นที่ฝั่งฟ้อนเอนท์ได้อย่างเช่นการทำ server side cache หรือการทำ cache ที่ฝั่ง cloud provider

2. Assuming the team has started planning a new project, the project manager asks you for a
performance test strategy plan for this release. How would you recommend proceeding to
the project manager?

แน่นอนว่าถ้าจะขึ้นของใหม่แรกสุดก่อนจะวางแผน Test ขอพูดเรื่อง tools ที่เหมาะกับจ็อบต่างๆต้องแต่ขั้น POC ก่อนที่จะทำ stress test , load test , Spike test , รวมถึง Pain test  ผมคิดว่าเราควรจะต้องรู้จักเครื่องมือของเราความสามารถของแต่อย่างก่อน และถัดมาคือการก่อนเราจะ Test อย่าลืมที่จะเซต APM และก็ Log โอเคถัดมาสิ่งที่เราต้องรู้ถัดมาคือ pain point ส่วนตัวคิดว่า test ทุกอันมีประโยชน์หมด แต่บางจ็อบ เราอาจะไม่ได้สนใจ spike test บางจ็อบ อาจจะไม่ต้องสนใจ pain test ต่อมาสิ่งที่เราต้องรู้ก่อนจะทำ Test และคิดว่าค่อนข้างจำสำคัญคือ Predict transection ของแต่ละ Phrase หรือ Release ตอน Project launch เพราะสิ่งนี้ จะช่วยตอบได้ว่า จ็อบไหนต้อง optimize จ็อบไหน critical สิ่งที่สำคัญมากๆเลยของการรู้ว่า test ไหนสำคัญ มันแลกมาด้วยเวลาใน การ optimize เมื่อ เรารู้หลายๆอย่างที่กล่างมาข้างต้นแล้ว เรามาเริ่มจากการ วิเคราะห์กลุ่ม target user ก่อน -> define scope สิ่งไหนสำคัญมั้ง ในจำนวนเท่าไหร่ จะ test สิ่งไหน ด้วย test แบบไหน -> กำหนดเกณฑ์ สิ่งที่อยากได้ -> แพลนนิ่งทูลที่จะใช้test สำคัญอย่าลืมคำณวน budget (ex.ส่งเมลล์ load test มีค่าใช้จ่ายเพิ่มเติมตาม transection เพราะเคยดดนไปตอนรั่วๆครับ55555 ) -> design test ตาม workflow ของ business -> อย่าลืม set monitoring -> วิเคราะห์ผลลัพธ์ -> สรุป -> แต่ถ้าไม่เวิร์ค -> optimize เฉพาะส่วนที่ไม่เวิร์ค -> retest ->  วิเคราะห์ผลลัพธ์ -> สรุป -> document


3.Design and develop two APIs using NestJS and Postgres with the following
    ผมมอง product เป็น 1 to many กับตัว translate เวลาหาใช้ key คู่เป็น id product กับ ตัวภาษา language นะครับ ท่าสร้างผมก็บ้่านๆบ้านนอกเลย ไม่มีดูบไป อิลาสติกเซิร์สอะไรทั้ง check  


React Questions

1. useCallback ใช้ทําอะไร

cache render ใช้คล้ายๆ userMemo แต่ Memo ไว้ใช้กับvalue ส่วน Callback ใช้กับ function หลักๆคิดว่าใช้ cache ของที่มีในcomponent ลดการ render ไม่จำเป็น

2. Write a unit test for the UserProfile React component using Jest and React Testing
Library.

ข้อนี้ขอข้ามได้ไหมครับเพราะผมน่าจะใช้ chatgpt เขียนแล้วค่อยมาจูนอยู่ดี คิดว่าไม่ต่างจากไฟล์ userprofile-test.txt มากอย่างมากก็ซอยเคสย่อยเพิ่ม
