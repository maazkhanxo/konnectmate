import { Box, useMediaQuery } from "@mui/material";
import JobsPosting from "components/jobsPosting/JobsPosting";
import JobShare from "components/jobshare/JobShare";
import Navbar from "scenes/navbar";
// import { useDispatch, useSelector } from "react-redux";
// import { setJobs } from "state";
import React, { useEffect, useState } from 'react';

const JobPage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="1rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "40%" : undefined}>
                    {/* jobposting */}
                    <JobsPosting />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "56%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    {/* joblisting */}
                    <JobShare  />
                </Box>
            </Box>
        </Box>
    )
}

export default JobPage