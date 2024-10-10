import styles from "./Avatar.module.scss";
import { UserProps, defaultUserProps } from "../../../types/userProps";

interface ReviewAvatarProps extends UserProps {
  watchDate?: string;
}

export default function ReviewAvatar({
  nickname = defaultUserProps.nickname,
  userId = defaultUserProps.userId,
  profileImage = defaultUserProps.profileImage,
  watchDate = "2020.10.21 관람",
}: ReviewAvatarProps) {
  return (
    <div className={styles.reviewAvatar}>
      <div className={styles.reviewAvatarImg}>
        <img src={profileImage} alt={nickname} className={styles.image} />
      </div>
      <div className={styles.reviewAvatarText}>
        <div className={styles.reviewAvatarTextTop}>
          <p className={`${styles.md} ${styles.black} ${styles.bold}`}>
            {nickname}
          </p>
          <p className={`${styles.xs} ${styles.black_lighter}`}>{userId}</p>
        </div>
        <p
          className={`${styles.reviewAvatarWatchDay} ${styles.sm} ${styles.black_light} ${styles.regular}`}
        >
          {watchDate}
        </p>
      </div>
    </div>
  );
}
