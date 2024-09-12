import { useState } from "react";
import PostComments from "./PostComments";
import PostContent from "./PostContent";
import postData from "../postData";

export default function DebatePost() {
  /* Challenge 

Form çalışmıyor. Göreviniz, kullanıcı "Gönder "e tıkladığında gönderiye bir yorum ekleyen kontrollü bir form yapmaktır.

    1. Yorum, yorum dizisinin alt kısmında, girilen kullanıcı adı ve yorum metni önceki yorumlar gibi görüntülenecek şekilde görünmelidir. 
       
    2. Yorum, önceki yorumların verilerini içeren array'e eklenmelidir. 
    
    3. Girilen kullanıcı adı kaydedilmeli, ancak kullanıcı onay kutusunu işaretlerse "AnonimKullanıcı" olarak görünmelidir.
    
    4. Kullanıcı formu göndermek için text input elemanına ve comment box elemanına metin girmek zorunda olmalı ve kullanıcı bir yorum gönderdikten sonra elemanlar ve onay kutusu temizlenmelidir. Sayfa yüklendiğinde de boş olmalıdırlar.   
        
    5. Kodunuz tamamen bu dosyanın içinde yer alabilir, ancak isterseniz bazı kısımları taşıyabilirsiniz. 

*/

  const [comments, setComments] = useState(postData.comments);
  const [newComment, setNewComment] = useState({
    userName: "",
    commentText: "",
    isAnonymous: false,
    id: crypto.randomUUID(),
  });

  function handleComment(e) {
    const { name, value, checked, type } = e.target;
    setNewComment((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setComments((prev) => [...prev, newComment]);
    setNewComment({
      userName: "",
      commentText: "",
      isAnonymous: false,
      id: crypto.randomUUID(),
    });
  }

  return (
    <div className="post-container">
      <PostContent data={{ ...postData }} />
      <PostComments data={comments} />
      <form onSubmit={handleSubmit}>
        <input
          className="text-input"
          type="text"
          name="userName"
          placeholder="Kullanıcı adı girin."
          onChange={handleComment}
          value={newComment.userName}
        />
        <textarea
          placeholder="Ne düşünüyorsunuz?"
          onChange={handleComment}
          value={newComment.commentText}
          name="commentText"
          required
        />
        <label>
          <input
            className="checkbox"
            type="checkbox"
            name="isAnonymous"
            onChange={handleComment}
            checked={newComment.isAnonymous}
          />
          İsimsiz mi göndereyim?
        </label>
        <button>Gönder</button>
      </form>
    </div>
  );
}
