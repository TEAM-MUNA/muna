import React, { useState, useEffect } from "react";
import styles from "./ReviewImageUploader.module.scss";
import PlusIcon from "../../../assets/svg/PlusIcon";
import CloseIcon from "../../../assets/svg/CloseIcon";
import Button from "../Button/Button";

interface ImageUploaderProps {
  imageList?: string[] | null;
  onImageChange?: (imageUrls: string[]) => void;
}

// 리뷰 이미지 업로더 리스트
export default function ReviewImageUploader({
  imageList,
  onImageChange,
}: ImageUploaderProps) {
  const [previewList, setPreviewList] = useState<string[]>([]);

  useEffect(() => {
    if (imageList) {
      setPreviewList(imageList);
    }
  }, [imageList]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPreviewList: string[] = [];

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newPreview = reader.result as string;
          newPreviewList.push(newPreview);
          if (newPreviewList.length === files.length) {
            const updatedPreviewList = [...previewList, ...newPreviewList];
            setPreviewList(updatedPreviewList);
            onImageChange?.(updatedPreviewList);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (src: string) => {
    const newPreviewList = previewList.filter(
      (previewSrc) => previewSrc !== src
    );
    setPreviewList(newPreviewList);
    onImageChange?.(newPreviewList);
  };

  return (
    <div className={styles.container}>
      <label htmlFor='review-image-input' className={styles.add_image}>
        <span className='sr_only'>리뷰 이미지 등록</span>
        <PlusIcon />
        <input
          type='file'
          accept='image/*'
          id='review-image-input'
          className='sr_only'
          onChange={handleFileChange}
          name='review-image'
          multiple
        />
      </label>
      <div className={styles.preview_list_container}>
        {previewList.length > 0 &&
          previewList.map((src, index) => (
            <div key={src} className={styles.preview_container}>
              <Button
                className={styles.remove}
                iconOnly={<CloseIcon size='20' />}
                label='리뷰 사진 삭제'
                onClick={() => {
                  removeImage(src);
                }}
              />
              <img src={src} alt={`리뷰 이미지 ${index + 1}`} />
            </div>
          ))}
      </div>
    </div>
  );
}
