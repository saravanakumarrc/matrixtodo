import './TaskEditor.scss';
import React, { useState } from 'react';
import { makeStyles, Select, MenuItem, FormControl, TextField } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import Joi from "joi-browser";
import { getSettings } from '../services/settingsService';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    margin: {
        margin: theme.spacing(1),
    }
}));

export default function TaskEditor(props) {    
    const classes = useStyles();
    const settings = getSettings();

    const [description, setDescription] = useState(props.task.description); 
    const [estimate, setEstimate] = useState(props.task.estimate);

    if(!estimate) {
        setEstimate(settings.defaultEstimate);
    }
    
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleEstimateChange = (event) => {
        setEstimate(event.target.value);
    };

    const resetForm = () => {
        setDescription('');
        setEstimate(settings.defaultEstimate);
    }

    const handleTaskSave = (event) => {
        Joi.validate({ description, estimate }, schema, function (err, value) {
            if(err === null) {
                props.onTaskSaved({
                    id: props.task.id,
                    description: description,
                    estimate: estimate,
                    taskGroup: props.task.taskGroup
                }).then(result =>{
                    resetForm();
                })
            }
            console.log(err, value);
        })
    };

    const schema = {
        description: Joi.string()
            .trim()
            .max(100)
            .required()
            .label("Description"),
        estimate: Joi.number()
          .required()
          .label("Estimate")
    };

    return ( 
        <div className="task task-content">
            <form className={classes.root} noValidate autoComplete="off">
                <FormControl className={classes.formControl}>
                    <TextField
                        id="task-description"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <Select
                            id="task-estimate-select"
                            value={estimate}
                            
                            onChange={handleEstimateChange}                        
                        >
                            <MenuItem value={10}>10 minutes</MenuItem>
                            <MenuItem value={20}>20 minutes</MenuItem>
                            <MenuItem value={30}>30 minutes</MenuItem>                    
                            <MenuItem value={45}>45 minutes</MenuItem>
                            <MenuItem value={60}>1 hour</MenuItem>
                            <MenuItem value={120}>2 hours</MenuItem>
                            <MenuItem value={180}>3 hours</MenuItem>                    
                            <MenuItem value={240}>4 hours</MenuItem>
                            <MenuItem value={360}>6 hours</MenuItem>                    
                            <MenuItem value={480}>8 hours</MenuItem>
                        </Select>
                </FormControl>
                <FontAwesomeIcon className="task-save" icon={faSave} onClick={handleTaskSave} />
            </form>
        </div> 
    );
    
}