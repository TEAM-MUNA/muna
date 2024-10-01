import styles from "./Avatar.module.scss";
import image from "../../../assets/img/user-default.png"

interface CardAvatarProps{
    nickName?: string;
    userName?: string;
}

export default function AvatarCard({
    nickName,
    userName, 
}: CardAvatarProps) {
    return(
        <div className={styles.card}>
            <div className={styles.cardImg}>
                <img src={image} alt={nickName} className={styles.image} />
            </div>
            <div className={styles.cardText}>
                <p className={`${styles.md} ${styles.black} ${styles.bold}`}>{nickName}</p>
                <p className={`${styles.xs} ${styles.black_lighter}`}>{userName}</p>
            </div>
        </div>
    )
}