<?php

declare(strict_types=1);

namespace Kotisivu\BlockTheme;

use HeikkiVihersalo\CustomPostTypes\CPTLoader;

( new CPTLoader( SITE_PATH, SITE_URI, __NAMESPACE__ ) )->run();
