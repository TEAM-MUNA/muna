import styles from "./Avatar.module.scss";
import { UserProps,defaultUserProps } from "../../../types/userProps";

export default function ProfileAvatar({
    nickname = defaultUserProps.nickname,
    userId = defaultUserProps.userId,
    userImage = defaultUserProps.userImage,
}: UserProps) {
    return(
        <div className={styles.profile}>
            <div className={styles.profileImg}>
                <img src={userImage} alt={nickname} className={styles.image} />
            </div>
            <div className={styles.profileText}>
                <p className={`${styles.xl} ${styles.black} ${styles.bold}`}>{nickname}</p>
                <p className={`${styles.sm} ${styles.black_lighter}`}>{userId}</p>
            </div>
        </div>
    )
}