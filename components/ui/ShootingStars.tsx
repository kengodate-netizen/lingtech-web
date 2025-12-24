import React, { useEffect, useState } from 'react';

const ShootingStars = () => {
  const [styles, setStyles] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    // 星の数（多すぎるとうるさいので控えめに）
    const starCount = 8;

    const newStyles = [...Array(starCount)].map(() => {
      const top = Math.floor(Math.random() * 100);
      const left = Math.floor(Math.random() * 100);
      const angle = Math.floor(Math.random() * 360);
      // 出現頻度（5秒〜20秒に1回程度。忘れた頃に流れる）
      const delay = Math.random() * 15 + 5;
      // 遠くの星はゆっくり動いて見えるため、少し時間をかける
      const duration = 2.0 + Math.random() * 2.0;

      return {
        '--top': `${top}%`,
        '--left': `${left}%`,
        '--angle': `${angle}deg`,
        '--delay': `${delay}s`,
        '--duration': `${duration}s`,
      } as React.CSSProperties;
    });

    setStyles(newStyles);
  }, []);

  return (
    // z-index: 0 (地球の裏側、キャンバスのさらに奥)
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <style>{`
        @keyframes distant-meteor-move {
          0% {
            transform: rotate(var(--angle)) translateX(0);
            opacity: 0;
          }
          10% {
            /* 一瞬だけ薄く光る */
            opacity: 0.6;
          }
          100% {
            /* 移動距離を短くする（遠くにあるため） */
            transform: rotate(var(--angle)) translateX(-150px);
            opacity: 0;
          }
        }

        .distant-meteor {
          position: absolute;
          top: var(--top);
          left: var(--left);
          
          /* ★ここが重要：サイズを極小にする */
          width: 60px; /* 長さ */
          height: 1px; /* 太さ */
          
          /* 白から透明へのグラデーション（かなり薄く） */
          background: linear-gradient(to right, rgba(255,255,255,0.8), transparent);
          
          /* アニメーション */
          animation: distant-meteor-move var(--duration) linear infinite;
          animation-delay: var(--delay);
          opacity: 0;
        }

        /* 頭（輝き）も極小にする */
        .distant-meteor::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0; 
          transform: translateY(-50%);
          
          width: 2px;
          height: 2px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          /* ぼかしも弱く */
          box-shadow: 0 0 4px rgba(255, 255, 255, 0.5);
        }
      `}</style>

      {styles.map((style, index) => (
        <span
          key={index}
          className="distant-meteor"
          style={style}
        />
      ))}
    </div>
  );
};

export default ShootingStars;