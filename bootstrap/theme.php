<?php

declare(strict_types=1);

return Vihersalo\Core\Foundation\Application::configure()
    ->withApi(
        routePath: __DIR__ . '/../routes/api.php',
        routeNamespace: 'api/v1',
    )
    ->boot();
