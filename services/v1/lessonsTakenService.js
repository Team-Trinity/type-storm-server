const calculateLessonsTaken = (wpmRecords, accuracyRecords) => {
    const lessonsTaken = Math.min(wpmRecords.length, accuracyRecords.length);
    return lessonsTaken;
};

module.exports = {
    calculateLessonsTaken
};