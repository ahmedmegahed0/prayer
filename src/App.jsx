import { useEffect, useState } from "react";
import Prayer from "./component/Prayer"


function App() {

  const [prayerTimes, setPrayerTimes] = useState({});
  const [datetime , setDateTime] = useState("");
  const [city, setCity] = useState("Cairo");

  const cities = [
    { name: "القاهره", value: "Cairo"},
    { name: "الاسكندريه", value: "Alexandria" },
    { name: "الجيزه", value: "Giza" },
    { name: "المنصوره", value: "Mansoura" },
    { name: "اسوان", value: "Aswan" },
    { name: "المنوفيه", value: "Menoufia" },
    { name: "البحيره", value: "Beheira" },
    { name: "كفر الشيخ", value: "Kafr El Sheikh" },
    { name: "الدقهلية", value: "Dakahlia" },
    { name: "الغربية", value: "Gharbia" },
    { name: "الشرقية", value: "Sharqia" },
    { name: "دمياط", value: "Damietta" },
    { name: "بورسعيد", value: "Port Said" },
    { name: "الإسماعيلية", value: "Dakahlia" },
    { name: "السويس", value: "Suez" },
    { name: "جنوب سيناء", value: "North Sinai" },
    { name: "البحر الأحمر", value: "Red Sea" },
    { name: "الفيوم", value: "Fayoum" },
    { name: "المنيا", value: "Minya" },
    { name: "بني سويف", value: "Beni Suef" },
    { name: "أسيوط", value: "Assiut" },
    { name: " سوهاج", value: "Beni Suef" },
    { name: "بني سويف", value: "Sohag" },
    { name: "قنا", value: "Qena" },
    { name: "أسوان", value: "Aswan" },
    { name: "مطروح", value: "Matrouh" },
    { name: "الاقصر", value: "Luxor" }
  ];


  useEffect(() => {
    const fetchPrayerTimes = async () => {  
      try {
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/03-09-2024?city=Eg&country=${city}`);
        const data_Prayar = await response.json();

        setPrayerTimes(data_Prayar.data.timings);
        setDateTime(data_Prayar.data.date.gregorian.date);
        console.log(data_Prayar.data.date.gregorian.date);
    } catch(error) {
      console.error(error);
    }
  }
    fetchPrayerTimes();
  }, [city]  )


  const formatTime = (time) => {
  
    if (!time) { 
      return "00:00" 
    } 
    let [hours, minutes] = time.split(':').map(Number);
    const pred = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${pred}`;
  }

  return (
    <>
      <section>
    
        <div className="container">
          <div className="top_sec">
            <div className="city">

              <h3>المدينه</h3>

              <select name="" id="" onChange={(e) => setCity(e.target.value)}> 
                {cities.map((city_Obj) => (
                  <option key={city_Obj.value} value={city_Obj.value}>{city_Obj.name}</option>
                ))}
              </select>

            </div>
            <div className="date">

              <h3>التاريخ</h3>
              <h4> {datetime} </h4>
            </div>
          </div>
          <Prayer name="الفجر" time={formatTime(prayerTimes.Fajr)} />
          <Prayer name="الظهر" time={formatTime(prayerTimes.Dhuhr)} />
          <Prayer name="العصر" time={formatTime(prayerTimes.Asr)}/>
          <Prayer name="المغرب" time={formatTime(prayerTimes.Maghrib)} />
          <Prayer name="العشاء" time={formatTime(prayerTimes.Isha)} />
        </div>
      </section>
    </>
  )
}

export default App
