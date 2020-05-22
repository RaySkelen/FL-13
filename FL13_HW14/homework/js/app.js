function Student(name, email) {
    const student = {
        name: name,
        email: email,
        homeworkResults: []
    };
    return {
        getName: function(newName) {
            if (newName === undefined) {
                return student.name
            } else {
                student.name = newName
                return student.name;
            }
        },
        getEmail: function(newEmail) {
            if (newEmail === undefined) {
                return student.email
            } else {
                student.email = newEmail
                return student.email;
            }
        },
        addHomeworkResult: function(topic, success) {
            let homework = {
                topic: topic,
                success: success
            };
            student.homeworkResults.push(homework);
        },
        getHomeworkResults: function() {
            return student.homeworkResults
        }
    }
}
function FrontendLab(students, faliedLimit) {
    for (const element of students) {
        element.homeworkResults = [];
    }
    return {
        printStudentList: function() {
            for (const element of students) {
                console.log(`name: ${element.name}, email: ${element.email}`);
                console.log(element.homeworkResults);
            }
        },
        addHomeworkResult: function(result) {
            for (const el of students) {
                let homeworkResult = {};
                homeworkResult.topic = result.topic;
                homeworkResult.success = result.results.filter(stud => { 
                    return stud.email === el.email 
                })[0].success;
                el.homeworkResults.push(homeworkResult);
            }
        },
        printStudentsEligibleForTest: function() {
            let eligible = [];
            for(const el of students) {
                let fails = 0;
                for(const item of el.homeworkResults) {
                    item.success === true ? null : fails ++;
                }
                fails > faliedLimit ? null : eligible.push(el);
            }
            for (const el of eligible) {
                console.log(`name: ${el.name}, email: ${el.email}`);
            }
        }
    }
}