const TypingAnimation = () => {
    return (
      <div className="flex items-center space-x-1">
        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-400 to-red-600 animate-pulse"></div>
        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-400 to-red-600 animate-pulse delay-75"></div>
        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-400 to-red-600 animate-pulse delay-150"></div>
      </div>
    );
  };
  
export default TypingAnimation;