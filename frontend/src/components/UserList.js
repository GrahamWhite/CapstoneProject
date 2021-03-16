import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
  } from "@material-ui/core";
  import { Pagination } from "@material-ui/lab";
  import React, { useEffect, useState, useCallback } from "react";
  import SearchBar from "material-ui-search-bar"; // https://www.npmjs.com/package/material-ui-search-bar
  import StarIcon from "@material-ui/icons/Star";
  import DeleteIcon from "@material-ui/icons/Delete";