// material-ui
import { FormControl, FormControlLabel, Switch } from '@mui/material';

// project imports
import SubCard from '@/components/SubCard';
import useConfig from '@/hooks/useConfig';

const BoxContainer = () => {
    const { container, onChangeContainer } = useConfig();

    return (
        <SubCard title="Box Container">
            <FormControl component="fieldset" sx={{ mt: 2 }}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={container}
                            onChange={() => onChangeContainer()}
                            inputProps={{ 'aria-label': 'controlled-direction' }}
                        />
                    }
                    label="Container"
                />
            </FormControl>
        </SubCard>
    );
};

export default BoxContainer;
