package com.example.timetable.service;

import com.example.timetable.model.Faculty;
import com.example.timetable.model.Lab;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class TimeTableService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public String[][] generateTimeTable(List<Faculty> faculties, List<Lab> labs) {
        String[][] timeTable = new String[6][8];  // 6 days x 8 periods

        HashMap<String,Integer> hash=new HashMap<>();
        FacultyService fs = new FacultyService();

        for(int i=0;i<faculties.size();i++){
            hash.put(faculties.get(i).getSubjectName(),faculties.get(i).getFacultyId());
        }
        for(int i=0;i<labs.size();i++){
            hash.put(labs.get(i).getSubjectName(),labs.get(i).getLabId());
        }


        // Lab allocation
        for (Lab lab : labs) {
            int totalLectures = 0;
            while (lab.getTotalLecturePerWeek() > totalLectures) {
                int day = (int) (Math.random() * 6);
                boolean alreadyInDay = false;

                for (int k = 0; k < 8; k++) {
                    if ((lab.getSubjectName() + "_Lab").equals(timeTable[day][k])) {
                        alreadyInDay = true;
                        break;
                    }
                }
                if (alreadyInDay) continue;

                boolean placed = false;
                for (int j = 0; j < 7; j++) {
                    if (timeTable[day][j] == null && timeTable[day][j + 1] == null) {
                        timeTable[day][j] = lab.getSubjectName() + "_Lab";
                        timeTable[day][j + 1] = lab.getSubjectName() + "_Lab";
                        totalLectures += 2;
                        placed = true;
                        break;
                    }
                }
                if (!placed) {
                    day = (int) (Math.random() * 6);
                }
            }
        }

        // Faculty allocation
        for (Faculty fac : faculties) {
            int totalLectures = 0;
            while (fac.getTotalLecturePerWeek() > totalLectures) {
                int day = (int) (Math.random() * 6);
                int lecturesToday = 0;

                for (int k = 0; k < 8; k++) {
                    if (fac.getSubjectName().equals(timeTable[day][k])) {
                        lecturesToday++;
                    }
                }
                if (lecturesToday >= 3) continue;

                boolean placed = false;
                for (int j = 0; j < 8; j++) {
                    if (timeTable[day][j] == null) {
                        String subj = fac.getSubjectName();
                        boolean valid = true;

                        if (j >= 2 && subj.equals(timeTable[day][j - 1]) && subj.equals(timeTable[day][j - 2])) valid = false;
                        if (j >= 1 && j < 7 && subj.equals(timeTable[day][j - 1]) && subj.equals(timeTable[day][j + 1])) valid = false;
                        if (j < 6 && subj.equals(timeTable[day][j + 1]) && subj.equals(timeTable[day][j + 2])) valid = false;

                        if (valid) {
                            timeTable[day][j] = subj;
                            totalLectures++;
                            placed = true;
                            break;
                        }
                    }
                }
                if (!placed) {
                    day = (int) (Math.random() * 6);
                }
            }
        }


        String classname="IT";
        for(int i=0;i<timeTable.length;i++) {
            for (int j = 0; j < timeTable[0].length; j++) {
                if (timeTable[i][j] != null) {
                    String tableName = "" + hash.get(timeTable[i][j]);
                    String sql = "INSERT INTO " + "t"+tableName + " (day, allotted) VALUES (?, ?)";
                    jdbcTemplate.update(sql, "" + i + "," + j + "", classname);
                }
            }
        }

        return timeTable;


        //logic reaming to write is when the class is already allotted don't allotte again
        //ii) take input as classname in postman

        //
    }
}
