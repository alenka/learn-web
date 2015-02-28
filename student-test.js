function StudentTest() {
    this.questions = [];
    this.correctCounter = 0;
}

/**
 * @link http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
 */
function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

StudentTest.prototype.addQuestion = function (question, correctAnswer, incorrectAnswers) {
    var answers = [].concat(incorrectAnswers);
    answers.push(correctAnswer);
    shuffle(answers);

    this.questions.push({
        question: question,
        answers: answers,
        correct: answers.indexOf(correctAnswer)
    });
};

StudentTest.prototype.render = function (form) {
    var self = this;
    this.questions.forEach(function (item, itemIndex) {
        var questionDiv = document.createElement('div');
        form.appendChild(questionDiv);
        questionDiv.className = 'question-item';
        var questionNode = document.createElement('span');
        questionDiv.appendChild(questionNode);
        questionNode.className = 'question';
        questionNode.innerText = item.question;

        var explanationNode = document.createElement('div');
        explanationNode.className = 'explanation';

        var answerInputs = item.answers.map(function (answer, answerIndex) {
            var answerDiv = document.createElement('div');
            questionDiv.appendChild(answerDiv);
            answerDiv.className = 'answer-container';

            var answerInput = document.createElement('input');
            answerDiv.appendChild(answerInput);
            answerInput.type = 'radio';
            answerInput.name = 'answer_' + itemIndex;
            answerInput.addEventListener('change', function () {
                answerInputs.forEach(function (answerInput) {
                    answerInput.disabled = true;
                });
                if (answerIndex !== item.correct) {
                    questionDiv.className += ' incorrect';
                    explanationNode.innerHTML = answer[1];
                } else {
                    questionDiv.className += ' passed';
                    explanationNode.innerHTML = 'Правильно';
                    self.correctCounter++;
                }
            });

            var answerSpan = document.createElement('span');
            answerDiv.appendChild(answerSpan);
            answerSpan.innerText = Array.isArray(answer) ? answer[0] : answer;

            return answerInput;
        });

        questionDiv.appendChild(explanationNode);
    });
};