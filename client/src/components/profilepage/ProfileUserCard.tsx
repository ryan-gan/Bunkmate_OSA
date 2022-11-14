// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHalf, faBed, faVenusMars, faLocationDot, faGraduationCap, faBroom} from '@fortawesome/free-solid-svg-icons';

// CSS
import '../../styles/ProfileUserCard.css';

// Pfps
import benPfp from '../../media/ben-liu-pfp-400x400.png';
import defaultPfp from '../../media/empty-pfp-400x400.png';

// Google Auth
import UserData from "../../types/UserData";

interface UserProps {
    id: number;
    name: string;
    pref_temp: string;
    bedtime: string;
    pref_gender: string;
    grad_year: string;
    pronouns: string;
    res_college: string;
    cleaning_freq: string;
    major: string;
    minor: string;
    overnight_guests: string;
    drinking: string;
    smoking: string;
    dynamic: string;
}

let pfps = new Map();

pfps.set("Ben Liu", benPfp);
pfps.set("Huzaifa Ali", defaultPfp);
pfps.set("Sofia Lakhani", defaultPfp);
pfps.set("Jonathan Jang", defaultPfp);
pfps.set("Isabel Wang", defaultPfp);


const ProfileUserCard = ({id, name, pref_temp, bedtime, pref_gender, grad_year, pronouns, res_college, cleaning_freq, major, minor, overnight_guests, drinking, smoking, dynamic}: UserProps) => {
    return (
        <div className="card-wrapper">
            <div className="card-content">
                <div className="card-heading">
                    <img className="user-pfp" src={pfps.get(name)} alt={name}/>
                    <div className="user-title">
                        <h1>{name}</h1>
                        <p className="user-pronouns">{pronouns}</p>
                    </div>
                </div>
                <div className="card-body">
                    <div className="attr-col">
                        <div className="user-attr" id="pref-gender">
                            <FontAwesomeIcon className="attr-icon" icon={faLocationDot}/>
                            <div className="attr-info">
                                <p className="attr-value">{res_college}</p>
                                <p className="attr-desc">College</p>
                            </div>
                        </div>
                        <div className="user-attr" id="bedtime">
                            <FontAwesomeIcon className="attr-icon" icon={faBed}/>
                            <div className="attr-info">
                                <p className="attr-value">{bedtime}</p>
                                <p className="attr-desc">Major</p>
                            </div>
                        </div>
                    </div>
                    <div className="attr-col">
                        <div className="user-attr" id="pref-temp">
                            <FontAwesomeIcon className="attr-icon" icon={faTemperatureHalf}/>
                            <div className="attr-info">
                                <p className="attr-value">{pref_temp}℉</p>
                                <p className="attr-desc">room temperature</p>
                            </div>
                        </div>
                        <div className="user-attr" id="cleaning-freq">
                            <FontAwesomeIcon className="attr-icon" icon={faBroom}/>
                            <div className="attr-info">
                                <p className="attr-value">{cleaning_freq}</p>
                                <p className="attr-desc">cleaning frequency</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfileUserCard;
