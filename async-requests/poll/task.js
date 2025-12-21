async function loadPoll() {
  const pollTitle = document.getElementById('poll__title');
  const pollAnswers = document.getElementById('poll__answers');
  
  try {
    const response = await fetch('https://students.netoservices.ru/nestjs-backend/poll');
    
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    
    pollTitle.textContent = data.data.title;
    
    pollAnswers.innerHTML = '';
    
    data.data.answers.forEach(answer => {
      const button = document.createElement('button');
      button.className = 'poll__answer';
      button.textContent = answer;
      
      button.addEventListener('click', () => {
        alert('Спасибо, ваш голос засчитан!');
      });
      
      pollAnswers.appendChild(button);
    });
    
  } catch (error) {
    console.error('Ошибка при загрузке опроса:', error);
    
    pollTitle.textContent = 'Не удалось загрузить опрос. Пожалуйста, обновите страницу.';
    
    pollAnswers.innerHTML = '';
  }
}

document.addEventListener('DOMContentLoaded', loadPoll);